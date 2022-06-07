namespace VacationCalendar.Api.Responses.VacationPeriod
{
    // TODO: maybe to record
    //public record CreateVacationPeriodResponse(
    //    Guid Id, 
    //    Guid UserId, 
    //    string FirstName, 
    //    string LastName, 
    //    DateTime From, 
    //    DateTime To, 
    //    string Notes);

    public class CreateVacationPeriodResponse
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public string Notes { get; set; }
    }
}
