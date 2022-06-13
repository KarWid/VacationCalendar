namespace VacationCalendar.Api.Middleware
{
    using System.Net;
    using System.Text.Json;
    using VacationCalendar.Api.Responses.BaseResponses;
    using VacationCalendar.BusinessLogic.Exceptions;
    using VacationCalendar.BusinessLogic.Resources;

    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        //private readonly ILoggerService _loggerService; // TODO

        public ErrorHandlingMiddleware(RequestDelegate next/*, ILoggerService loggerService*/)
        {
            _next = next;
            //_loggerService = loggerService;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(httpContext, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext httpContext, Exception ex)
        {
            //_loggerService.LogError(httpContext, ex);

            var response = httpContext.Response;
            response.ContentType = "application/json";

            ApiResponse apiResponseResult = new BussinessLogicErrorApiResponse(GeneralResource.Something_Went_Wrong);

            switch (ex)
            {
                case ValidationManagerException validationApiManagerException:
                    response.StatusCode = (int)HttpStatusCode.BadRequest;
                    apiResponseResult = new ValidationApiResponse(validationApiManagerException.Errors);
                    break;
                case NotFoundException notFoundApiManagerException:
                    response.StatusCode = (int)HttpStatusCode.NotFound;
                    apiResponseResult = new NotFoundApiResponse(notFoundApiManagerException.Message);
                    break;
                case ManagerException apiManagerException:
                    response.StatusCode = (int)HttpStatusCode.BadRequest;
                    apiResponseResult = new BussinessLogicErrorApiResponse(apiManagerException.Message);
                    break;
                default:
                    response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    apiResponseResult = new BussinessLogicErrorApiResponse(GeneralResource.Something_Went_Wrong);
                    break;
            }

            var result = JsonSerializer.Serialize(apiResponseResult);
            await response.WriteAsync(result);
        }
    }
}
