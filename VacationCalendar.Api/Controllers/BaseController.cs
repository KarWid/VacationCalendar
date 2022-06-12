namespace VacationCalendar.Api.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using VacationCalendar.Api.Responses.BaseResponses;

    [ApiController]
    public class BaseController : ControllerBase
    {
        protected OkObjectResult Ok<T>(T value) where T : class
        {
            return base.Ok(new SuccessApiResponse<T>(value));
        }
    }
}
