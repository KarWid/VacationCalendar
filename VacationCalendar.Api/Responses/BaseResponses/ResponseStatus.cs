namespace VacationCalendar.Api.Responses.BaseResponses
{
    public enum ResponseStatus
    {
        Success = 0,
        NotFound = 1,
        DatabaseError = 2,
        BusinessLogicError = 3,
        InvalidQuery = 4
    }
}
