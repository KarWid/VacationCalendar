namespace VacationCalendar.Repository.EF
{
    using Microsoft.EntityFrameworkCore;
    using VacationCalendar.Repository.EF.Configuration;
    using VacationCalendar.Repository.Entities;

    public class AppDbContext : DbContext
    {
        public DbSet<UserEntity> Users { get; set; }
        public DbSet<VacationPeriodEntity> VacationPeriods { get; set; }

        public AppDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.HasPostgresExtension("uuid-ossp");

            modelBuilder.ApplyConfiguration(new VacationPeriodConfiguration());
            modelBuilder.ApplyConfiguration(new UserConfiguration());
        }
    }
}
