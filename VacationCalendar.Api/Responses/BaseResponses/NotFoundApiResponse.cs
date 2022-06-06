namespace VacationCalendar.Api.Responses.BaseResponses
{
    using System.Collections.Generic;

    public record NotFoundApiResponse(IList<string> Errors) : ApiResponse(ResponseStatus.NotFound, Errors)
    {
        public NotFoundApiResponse(string error) : this(new List<string> { error }) { }
    }
}
