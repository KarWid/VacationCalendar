namespace VacationCalendar.Api.Responses.BaseResponses
{
    using FluentValidation.Results;
    using System.Collections.Generic;

    public record BussinessLogicErrorApiResponse(IList<string> Errors) : ApiResponse(ResponseStatus.BusinessLogicError, Errors)
    {
        public BussinessLogicErrorApiResponse(string error) : this(new List<string> { error }) { }
    }
}
