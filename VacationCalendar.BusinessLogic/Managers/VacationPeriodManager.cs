namespace VacationCalendar.BusinessLogic.Managers
{
    using VacationCalendar.BusinessLogic.Models;
    using VacationCalendar.Repository;

    public interface IVacationPeriodManager
    {
        Task<VacationPeriod> CreateAsync(VacationPeriod vacationPeriod);
    }

    public class VacationPeriodManager : IVacationPeriodManager
    {
        private readonly IRepository _repository;

        public VacationPeriodManager(IRepository repository)
        {
            _repository = repository;
        }

        public async Task<VacationPeriod> CreateAsync(VacationPeriod vacationPeriod)
        {
            // check if the user exists in the database by FirstName and LastName, if so then get Id
            // if not then create a user and get Id

            // assign the UserId to VacationPeriod, validate dates, length of Notes
            // get all vacation periods defined for the user. Validate new vacation period if it collapses with existing periods.

            // create a new vacation period
            await Validate(vacationPeriod);
            throw new NotImplementedException();
        }

        private async Task Validate(VacationPeriod vacationPeriod)
        {
            // check if the user exists in the database by FirstName and LastName, if so then get Id
            // if not then create a user and get Id

            // assign the UserId to VacationPeriod, validate dates, length of Notes
            // get all vacation periods defined for the user. Validate new vacation period if it collapses with existing periods.

            // create a new vacation period
            throw new NotImplementedException();
        }
    }
}
