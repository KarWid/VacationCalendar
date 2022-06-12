namespace VacationCalendar.Api.Responses.BaseResponses
{
    public record ValidationApiResponse(IList<string> Errors) : ApiResponse(ResponseStatus.Validation, Errors)
    {
        public ValidationApiResponse(string error) : this(new List<string> { error }) { }
    }
}
