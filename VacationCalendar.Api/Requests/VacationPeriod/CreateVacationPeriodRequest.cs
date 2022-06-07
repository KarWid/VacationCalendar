using System.ComponentModel;
namespace VacationCalendar.Api.Requests.VacationPeriod
{
    public record CreateVacationPeriodRequest(string FirstName, string LastName, DateTime From, DateTime To, string Notes);
}
