namespace VacationCalendar.Repository.EF.Configuration
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using VacationCalendar.Repository.Entities;

    internal class VacationPeriodConfiguration : IEntityTypeConfiguration<VacationPeriodEntity>
    {
        // TODO: Add indexes
        public void Configure(EntityTypeBuilder<VacationPeriodEntity> builder)
        {
            builder.HasKey(vacationPeriod => vacationPeriod.Id);
            builder.Property(vacationPeriod => vacationPeriod.Notes).HasMaxLength(200);

            builder.Property(vacationPeriod => vacationPeriod.From)
                .IsRequired()
                .HasColumnType("Date");
            builder.Property(vacationPeriod => vacationPeriod.To)
                .IsRequired()
                .HasColumnType("Date");

            builder.Property(vacationPeriod => vacationPeriod.CreatedAt).IsRequired();

            builder.HasOne(vacationPeriod => vacationPeriod.User)
                .WithMany(user => user.VacationPeriods)
                .HasForeignKey(vacationPeriod => vacationPeriod.UserId)
                .IsRequired();
        }
    }
}
