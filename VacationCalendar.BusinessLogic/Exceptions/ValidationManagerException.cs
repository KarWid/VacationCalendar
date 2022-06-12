namespace VacationCalendar.BusinessLogic.Exceptions
{
    using FluentValidation.Results;

    public class ValidationManagerException : ManagerException
    {
        public IList<string> Errors { get; }

        public ValidationManagerException(string error) 
        {
            Errors = new List<string> { error };
        }

        public ValidationManagerException(ValidationResult validationResult)
        {
            Errors = validationResult.Errors.Select(_ => _.ErrorMessage).ToList();
        }
    }
}
