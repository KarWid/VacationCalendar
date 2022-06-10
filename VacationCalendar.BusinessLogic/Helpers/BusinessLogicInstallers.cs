namespace VacationCalendar.BusinessLogic.Helpers
{
    using System.Reflection;
    using Microsoft.Extensions.DependencyInjection;

    public static class BusinessLogicInstallers
    {
        public static IServiceCollection AddVacationCalendarServicesBusinessLogic(this IServiceCollection services)
        {
            services.AddAutoMapper(Assembly.GetExecutingAssembly());

            return services;
        }
    }
}
