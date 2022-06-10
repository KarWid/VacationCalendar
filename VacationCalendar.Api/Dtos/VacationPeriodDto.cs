using VacationCalendar.BusinessLogic.Models;

namespace VacationCalendar.Api.Dtos
{
    public record VacationPeriodDto(Guid Id, Guid UserId, string FirstName, string LastName, string Notes, DateTime From, DateTime To)
    {
        public static VacationPeriodDto FromModel(VacationPeriod vacationPeriod)
        {
            return new VacationPeriodDto(
                vacationPeriod.Id, 
                vacationPeriod.User.Id, 
                vacationPeriod.User.FirstName, 
                vacationPeriod.User.LastName, 
                vacationPeriod.Notes, 
                vacationPeriod.From, 
                vacationPeriod.To);
        }
    }
}
