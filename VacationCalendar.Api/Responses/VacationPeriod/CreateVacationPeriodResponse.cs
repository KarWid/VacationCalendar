namespace VacationCalendar.Api.Responses.VacationPeriod
{
    public record CreateVacationPeriodResponse(
        Guid id, 
        Guid UserId, 
        string FirstName, 
        string LastName, 
        DateTime From, 
        DateTime To, 
        string Comment);
}
