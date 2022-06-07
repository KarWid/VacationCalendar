namespace VacationCalendar.Repository.EF
{
    using System.Linq.Expressions;
    using VacationCalendar.Repository.Entities;

    public class Repository : IRepository
    {
        private readonly AppDbContext _dbContext;

        public Repository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<TEntity?> GetByIdAsync<TEntity, TId>(TId id) where TEntity : BaseEntity
        {
            return await _dbContext.Set<TEntity>().FindAsync(id);
        }

        public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            return await _dbContext.SaveChangesAsync(cancellationToken);
        }

        public TEntity Add<TEntity>(TEntity entity) where TEntity : BaseEntity
        {
            return _dbContext.Add(entity).Entity;
        }


        public IQueryable<TEntity> FilterBy<TEntity>(Expression<Func<TEntity, bool>> filter) where TEntity : BaseEntity
        {
            return _dbContext.Set<TEntity>().Where(filter);
        }
    }
}
