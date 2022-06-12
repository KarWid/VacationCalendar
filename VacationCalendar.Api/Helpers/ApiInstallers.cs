namespace VacationCalendar.Api.Helpers
{
    using System.Reflection;

    public static class ApiInstallers
    {
        public static IServiceCollection AddVacationCalendarServicesApi(this IServiceCollection services)
        {
            services.AddAutoMapper(Assembly.GetExecutingAssembly());

            return services;
        }
    }
}
