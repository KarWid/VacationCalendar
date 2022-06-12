namespace VacationCalendar.BusinessLogic.Validators.User
{
    using FluentValidation;
    using VacationCalendar.BusinessLogic.Helpers;

    public class UserValidator: AbstractValidator<Models.User>
    {
        public UserValidator()
        {
            RuleFor(_ => _.FirstName).NotEmptyMaximumLength(50);
            RuleFor(_ => _.LastName).NotEmptyMaximumLength(50);
        }
    }
}
