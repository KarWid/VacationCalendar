namespace VacationCalendar.Api.Controllers
{
    using AutoMapper;
    using Microsoft.AspNetCore.Mvc;
    using VacationCalendar.Api.Dtos;
    using VacationCalendar.Api.Requests.VacationPeriod;
    using VacationCalendar.Api.Responses.BaseResponses;
    using VacationCalendar.Api.Responses.VacationPeriod;
    using VacationCalendar.BusinessLogic.Managers;
    using VacationCalendar.BusinessLogic.Models;

    [Route("api/[controller]")]
    [ApiController]
    public class VacationPeriodController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly IVacationPeriodManager _vacationPeriodManager;

        public VacationPeriodController(
            IVacationPeriodManager vacationPeriodManager, 
            IMapper mapper)
        {
            _mapper = mapper;
            _vacationPeriodManager = vacationPeriodManager;
        }


        [ProducesResponseType(typeof(ApiResponse<GetVacationPeriodsByDatesResponse>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status400BadRequest)]
        [HttpGet("")]
        public async Task<IActionResult> Get([FromQuery]GetVacationPeriodsByDatesRequest request, CancellationToken cancellationToken = default(CancellationToken))
        {
            var vacationPeriods = request.From.CompareTo(request.To) == 0
                ? await _vacationPeriodManager.GetAsync(request.From.Date, cancellationToken)
                : await _vacationPeriodManager.GetAsync(request.From.Date, request.To.Date, cancellationToken);

            var result = new GetVacationPeriodsByDatesResponse
            {
                VacationPeriods = vacationPeriods.Select(vacationPeriod => VacationPeriodDto.FromModel(vacationPeriod)).ToList()
            };

            return Ok(result);
        }

        [ProducesResponseType(typeof(ApiResponse<CreateVacationPeriodResponse>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status400BadRequest)]
        [HttpPost("")]
        public async Task<IActionResult> Create([FromBody] CreateVacationPeriodRequest request, CancellationToken cancellationToken = default(CancellationToken))
        {
            var vacationPeriod = _mapper.Map<VacationPeriod>(request);
            var createdVacationPeriod = await _vacationPeriodManager.CreateAsync(vacationPeriod, cancellationToken);

            return Ok(_mapper.Map<CreateVacationPeriodResponse>(createdVacationPeriod));
        }
    }
}
