namespace VacationCalendar.Repository.EF.Configuration
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using VacationCalendar.Repository.Entities;

    internal class UserConfiguration : IEntityTypeConfiguration<UserEntity>
    {
        public void Configure(EntityTypeBuilder<UserEntity> builder)
        {
            builder.HasKey(user => user.Id);

            builder.Property(vacationPeriod => vacationPeriod.CreatedAt).IsRequired();

            builder.Property(user => user.FirstName)
                .HasMaxLength(50)
                .IsRequired();

            builder.Property(user => user.LastName)
                .HasMaxLength(50)
                .IsRequired();
        }
    }
}
