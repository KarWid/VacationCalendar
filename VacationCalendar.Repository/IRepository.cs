namespace VacationCalendar.Repository
{
    using System.Linq.Expressions;
    using VacationCalendar.Repository.Entities;

    public interface IRepository
    {
        TEntity Add<TEntity>(TEntity entity) where TEntity : BaseEntity;
        Task<TEntity?> GetByIdAsync<TEntity, TId>(TId id) where TEntity : BaseEntity;
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken));
        IQueryable<TEntity> FilterBy<TEntity>(Expression<Func<TEntity, bool>> filter) where TEntity : BaseEntity;
    }
}
