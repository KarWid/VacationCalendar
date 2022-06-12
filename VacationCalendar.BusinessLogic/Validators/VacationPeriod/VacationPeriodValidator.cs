namespace VacationCalendar.BusinessLogic.Validators.VacationPeriod
{
    using FluentValidation;
    using VacationCalendar.BusinessLogic.Helpers;
    using VacationCalendar.BusinessLogic.Services;
    using VacationCalendar.BusinessLogic.Validators.User;
    using GeneralBusinessLogicResource = VacationCalendar.BusinessLogic.Resources.GeneralResource;

    public class VacationPeriodValidator : AbstractValidator<Models.VacationPeriod>
    {
        private readonly ITimeService _timeService;

        public VacationPeriodValidator(ITimeService timeService)
        {
            _timeService = timeService;

            RuleFor(_ => _.User)
                .NotNull().WithMessage(GeneralBusinessLogicResource.ErrorMessage_Required_Fluent)
                .SetValidator(new UserValidator());

            RuleFor(_ => _.Notes).MaximumLength(200).WithMessage(GeneralBusinessLogicResource.ErrorMessage_MaximumLength_Fluent);

            RuleFor(_ => _.From).Must(BeLaterThanTodayOrEven).WithMessage(GeneralBusinessLogicResource.ErrorMessage_LaterThanToday_Fluent);
            RuleFor(_ => _.To)
                .Must(BeLaterThanTodayOrEven).WithMessage(GeneralBusinessLogicResource.ErrorMessage_LaterThanToday_Fluent)
                .LaterThanOrEqualToWithErrorMessage(x => x.From); // TODO: change validation to compare only Date property
        }

        protected bool BeLaterThanTodayOrEven(DateTime date)
        {
            return (date.ToUniversalTime().Date - _timeService.Now().Date).TotalDays >= 0;
        }
    }
}
