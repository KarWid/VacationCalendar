namespace VacationCalendar.Api.Responses.VacationPeriod
{
    using VacationCalendar.Api.Dtos;

    public class GetVacationPeriodsByDatesResponse
    {
        public ICollection<VacationPeriodDto> VacationPeriods { get; set; }
    }
}
