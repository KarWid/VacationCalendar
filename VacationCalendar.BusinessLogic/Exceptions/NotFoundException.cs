namespace VacationCalendar.BusinessLogic.Exceptions
{
    public class NotFoundException : ManagerException
    {
        public NotFoundException(string message) : base(message) { }
    }
}
