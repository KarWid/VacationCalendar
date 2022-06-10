namespace VacationCalendar.BusinessLogic.Models
{
    public class VacationPeriod
    {
        public Guid Id { get; set; }
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public User User { get; set; }
        public string Notes { get; set; }
    }
}
