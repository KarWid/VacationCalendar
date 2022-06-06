using Microsoft.AspNetCore.Mvc;
using VacationCalendar.Api.Responses.BaseResponses;

namespace VacationCalendar.Api.Controllers
{
    [ApiController]
    public class BaseController : ControllerBase
    {
        protected OkObjectResult Ok<T>(T value) where T : class
        {
            return base.Ok(new SuccessApiResponse<T>(value));
        }
    }
}
