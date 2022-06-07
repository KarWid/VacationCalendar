namespace VacationCalendar.Api.Helpers
{
    using System.Reflection;
    using FluentValidation.AspNetCore;
    using VacationCalendar.Api.Validators.VacationPeriod;

    public static class ApiInstallers
    {
        public static IServiceCollection AddVacationCalendarServicesApi(this IServiceCollection services)
        {
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddFluentValidation(_ => _.RegisterValidatorsFromAssemblyContaining<CreateVacationPeriodRequestValidator>());

            return services;
        }
    }
}
