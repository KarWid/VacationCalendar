namespace VacationCalendar.Repository.Entities
{
    public class VacationPeriodEntity : BaseEntity
    {
        public Guid UserId { get; set; }
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public string Notes { get; set; }

        public UserEntity User { get; set; }
    }
}
