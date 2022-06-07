namespace VacationCalendar.BusinessLogic.Services
{
    public interface ITimeService
    {
        DateTime UtcNow();
        DateTime Now();
    }

    public class TimeService : ITimeService
    {
        public DateTime UtcNow()
        {
            return DateTime.UtcNow;
        }

        public DateTime Now()
        {
            return DateTime.Now;
        }
    }
}
