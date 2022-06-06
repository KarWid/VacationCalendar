namespace VacationCalendar.Repository.Entities
{
    using System.ComponentModel.DataAnnotations;

    public abstract class BaseEntity<TId>
    {
        [Key]
        public TId Id {get; set;}

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public abstract class BaseEntity : BaseEntity<Guid>
    {

    }
}
