namespace VacationCalendar.BusinessLogic.Helpers
{
    using System.Reflection;
    using FluentValidation.AspNetCore;
    using Microsoft.Extensions.DependencyInjection;
    using VacationCalendar.BusinessLogic.Validators.VacationPeriod;

    public static class BusinessLogicInstallers
    {
        public static IServiceCollection AddVacationCalendarServicesBusinessLogic(this IServiceCollection services)
        {
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddFluentValidation(_ => _.RegisterValidatorsFromAssemblyContaining<VacationPeriodValidator>());

            return services;
        }
    }
}
