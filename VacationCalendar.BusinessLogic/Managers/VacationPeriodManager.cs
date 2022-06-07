namespace VacationCalendar.BusinessLogic.Managers
{
    using AutoMapper;
    using Microsoft.EntityFrameworkCore;
    using VacationCalendar.BusinessLogic.Exceptions;
    using VacationCalendar.BusinessLogic.Models;
    using VacationCalendar.BusinessLogic.Resources;
    using VacationCalendar.BusinessLogic.Services;
    using VacationCalendar.Repository;
    using VacationCalendar.Repository.Entities;

    public interface IVacationPeriodManager
    {
        /// <summary>
        /// Creates new user if not exists and creates new vacation period if it does not collapse with another user's vacation period.
        /// </summary>
        /// <param name="vacationPeriod">New vacation period with defined user values.</param>
        /// <param name="cancellationToken"></param>
        /// <returns>Newly created vacation Period</returns>
        /// <exception cref=""/>
        Task<VacationPeriod> CreateAsync(VacationPeriod vacationPeriod, CancellationToken cancellationToken = default(CancellationToken));

        /// <summary>
        /// Returns all vacation periods defined in the date time range from to 'to'.
        /// </summary>
        /// <param name="from">Date from.</param>
        /// <param name="to">Date to.</param>
        /// <param name="cancellationToken">Cancellation token.</param>
        /// <returns>All vacation periods defined in the date time range.</returns>
        Task<ICollection<VacationPeriod>> GetAsync(DateTime from, DateTime to, CancellationToken cancellationToken = default(CancellationToken));

        /// <summary>
        /// Returns all vacation periods defined in the requested date.
        /// </summary>
        /// <param name="date"></param>
        /// <param name="cancellationToken"></param>
        /// <returns>List of vacation periods defined in requested date.</returns>
        Task<ICollection<VacationPeriod>> GetAsync(DateTime date, CancellationToken cancellationToken = default(CancellationToken));
    }

    public class VacationPeriodManager : IVacationPeriodManager
    {
        private readonly IMapper _mapper;
        private readonly IRepository _repository;
        private readonly ITimeService _timeService;

        public VacationPeriodManager(IRepository repository, IMapper mapper, ITimeService timeService)
        {
            if (repository == null) throw new ArgumentException("Repository");
            if (mapper == null) throw new ArgumentException("Mapper");
            if (timeService == null) throw new ArgumentException("TimeService");

            _mapper = mapper;
            _repository = repository;
            _timeService = timeService;
        }

        /// <inheritdoc cref="IVacationPeriodManager"/>
        public async Task<VacationPeriod> CreateAsync(VacationPeriod vacationPeriod, CancellationToken cancellationToken = default(CancellationToken))
        {
            var userEntity = await _repository
                .FilterBy<UserEntity>(user => user.FirstName == vacationPeriod.User.FirstName && user.LastName == vacationPeriod.User.LastName)
                .FirstOrDefaultAsync(cancellationToken);

            if (userEntity == null)
            {
                // if user does not exist then create a user. There is no need to validate the vacation period "overlapsing"
                var newUserEntity = _mapper.Map<UserEntity>(vacationPeriod.User);
                newUserEntity.CreatedAt = _timeService.UtcNow();
                userEntity = _repository.Add(newUserEntity);
            }
            else
            {
                await ValidateIfVacationPeriodOverlapsAnotherAsync(vacationPeriod, userEntity.Id, cancellationToken);
            }

            var vacationPeriodEntity = _mapper.Map<VacationPeriodEntity>(vacationPeriod);
            vacationPeriodEntity.CreatedAt = _timeService.UtcNow();
            vacationPeriodEntity.UserId = userEntity.Id;

            var newVacationPeriod = _repository.Add(vacationPeriodEntity);
            await _repository.SaveChangesAsync();

            return _mapper.Map<VacationPeriod>(newVacationPeriod);
        }

        /// <inheritdoc cref="IVacationPeriodManager"/>
        public async Task<ICollection<VacationPeriod>> GetAsync(DateTime from, DateTime to, CancellationToken cancellationToken = default(CancellationToken))
        {
            var resultEntities = await _repository
                .FilterBy<VacationPeriodEntity>(period =>
                    ((period.To >= from && period.To <= to) || (period.From >= from && period.From <= from) || (period.From <= from && period.To >= to)))
                .Include(period => period.User)
                .ToListAsync(cancellationToken);

            return _mapper.Map<ICollection<VacationPeriod>>(resultEntities);
        }

        public async Task<ICollection<VacationPeriod>> GetAsync(DateTime date, CancellationToken cancellationToken = default)
        {
            var result = await _repository
                .FilterBy<VacationPeriodEntity>(period => period.From <= date && period.To >= date)
                .Include(period => period.User)
                .ToListAsync();

            return _mapper.Map<ICollection<VacationPeriod>>(result);
        }

        /// <summary>
        /// Validates if new vacation period overlaps another user's vacation period.
        /// </summary>
        /// <param name="vacationPeriod">Vacation period</param>
        /// <param name="userId">User identifier</param>
        /// <param name="cancellationToken"></param>
        /// <returns>Throws an exception if vacation period overlaps another user's vacation period.</returns>
        /// <exception cref="ManagerException"></exception>
        private async Task ValidateIfVacationPeriodOverlapsAnotherAsync(VacationPeriod vacationPeriod, Guid userId, CancellationToken cancellationToken = default(CancellationToken))
        {
            // TODO: modify it to use expression tree
            var vacationPeriodOverlapsExistingUserPeriod = 
                await _repository
                    .FilterBy<VacationPeriodEntity>(period =>
                        period.UserId == userId
                        && (
                            (vacationPeriod.From >= period.From && vacationPeriod.From <= period.To)
                            || (vacationPeriod.To >= period.From && vacationPeriod.To <= period.To)
                            || (vacationPeriod.From < period.From && vacationPeriod.To > period.To)))
                    .AnyAsync(cancellationToken);

            if (vacationPeriodOverlapsExistingUserPeriod)
            {
                throw new ManagerException(GeneralResource.ErrorMessage_VacationPeriod_Overlaps);
            }
        }
    }
}
