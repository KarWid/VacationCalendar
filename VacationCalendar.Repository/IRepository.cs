using VacationCalendar.Repository.Entities;

namespace VacationCalendar.Repository
{
    public interface IRepository
    {
        TEntity Add<TEntity>(TEntity entity) where TEntity : BaseEntity;
        Task<TEntity?> GetByIdAsync<TEntity, TId>(TId id) where TEntity : BaseEntity;
        Task<int> SaveChangesAsync();
    }
}
