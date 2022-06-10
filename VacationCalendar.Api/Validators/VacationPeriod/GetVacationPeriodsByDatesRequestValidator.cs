namespace VacationCalendar.Api.Validators.VacationPeriod
{
    using FluentValidation;
    using VacationCalendar.Api.Requests.VacationPeriod;
    using VacationCalendar.BusinessLogic.Helpers;

    public class GetVacationPeriodsByDatesRequestValidator : AbstractValidator<GetVacationPeriodsByDatesRequest>
    {
        public GetVacationPeriodsByDatesRequestValidator()
        {
            RuleFor(_ => _.To).LaterThanOrEqualToWithErrorMessage(x => x.From); // TODO: change validation to compare only Date property
        }
    }
}
