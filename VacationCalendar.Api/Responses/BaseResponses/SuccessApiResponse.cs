namespace VacationCalendar.Api.Responses.BaseResponses
{
    public record SuccessApiResponse<T>(T Result) : ApiResponse<T>(Result, ResponseStatus.Success, new List<string>()) where T : class;
}
