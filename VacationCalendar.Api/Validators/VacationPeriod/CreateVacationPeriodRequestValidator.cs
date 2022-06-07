namespace VacationCalendar.Api.Validators.VacationPeriod
{
    using FluentValidation;
    using VacationCalendar.Api.Requests.VacationPeriod;
    using VacationCalendar.BusinessLogic.Helpers;
    using VacationCalendar.BusinessLogic.Services;
    using GeneralBusinessLogicResource = VacationCalendar.BusinessLogic.Resources.GeneralResource;

    public class CreateVacationPeriodRequestValidator : AbstractValidator<CreateVacationPeriodRequest>
    {
        private readonly ITimeService _timeService;

        public CreateVacationPeriodRequestValidator(ITimeService timeService)
        {
            _timeService = timeService;

            RuleFor(_ => _.FirstName).NotEmptyMaximumLength(50);
            RuleFor(_ => _.LastName).NotEmptyMaximumLength(50);
            RuleFor(_ => _.Notes).MaximumLength(200).WithMessage(GeneralBusinessLogicResource.ErrorMessage_MaximumLength);

            RuleFor(_ => _.From).Must(BeLaterThanToday).WithMessage(GeneralBusinessLogicResource.ErrorMessage_LaterThanToday);
            RuleFor(_ => _.To)
                .Must(BeLaterThanToday).WithMessage(GeneralBusinessLogicResource.ErrorMessage_LaterThanToday)
                .LaterThanOrEqualToWithErrorMessage(x => x.From); // TODO: change validation to compare only Date property
        }

        protected bool BeLaterThanToday(DateTime date)
        {
            return (date.ToUniversalTime().Date - _timeService.Now().Date).TotalDays >= 1;
        }
    }
}
