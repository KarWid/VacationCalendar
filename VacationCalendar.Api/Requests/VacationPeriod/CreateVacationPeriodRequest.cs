using System.ComponentModel;
namespace VacationCalendar.Api.Requests.VacationPeriod
{
    // TODO: change dates to short dates to take only short date without hours and minutes
    public record CreateVacationPeriodRequest(string FirstName, string LastName, DateTime From, DateTime To, string Notes);
}
