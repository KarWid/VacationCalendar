namespace VacationCalendar.BusinessLogic.Models
{
    public record VacationPeriod(Guid Id, User user, DateTime From, DateTime To, string Comment);
}
