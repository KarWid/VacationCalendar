namespace VacationCalendar.Api.Responses.BaseResponses
{
    using System.Collections.Generic;

    public record DatabaseErrorApiResponse(IList<string> Errors) : ApiResponse(ResponseStatus.DatabaseError, Errors)
    {
        public DatabaseErrorApiResponse(string error) : this(new List<string> { error }) { }
    }
}
