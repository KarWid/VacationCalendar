namespace VacationCalendar.Api.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using VacationCalendar.Api.Requests.VacationPeriod;
    using VacationCalendar.Api.Responses.BaseResponses;
    using VacationCalendar.Api.Responses.VacationPeriod;
    using VacationCalendar.BusinessLogic.Managers;

    [Route("api/[controller]")]
    [ApiController]
    public class VacationPeriodController : BaseController
    {
        private readonly IVacationPeriodManager _vacationPeriodManager;

        public VacationPeriodController(IVacationPeriodManager vacationPeriodManager)
        {
            _vacationPeriodManager = vacationPeriodManager;
        }

        [ProducesResponseType(typeof(ApiResponse<CreateVacationPeriodResponse>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status400BadRequest)]
        [HttpPost("")]
        public async Task<IActionResult> Create([FromBody] CreateVacationPeriodRequest request)
        {
            

            return Ok();
        }
    }
}
