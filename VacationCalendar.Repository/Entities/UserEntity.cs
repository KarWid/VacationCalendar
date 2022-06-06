namespace VacationCalendar.Repository.Entities
{
    public class UserEntity : BaseEntity
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public ICollection<VacationPeriodEntity> VacationPeriods { get; set; }
    }
}
