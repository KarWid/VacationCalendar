namespace VacationCalendar.Api.Controllers
{
    using AutoMapper;
    using FluentValidation;
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
        private readonly IValidator<CreateVacationPeriodRequest> _createVacationPeriodRequestValidator;
        private readonly IValidator<GetVacationPeriodsByDatesRequest> _getVacationPeriodRequestValidator;

        public VacationPeriodController(
            IVacationPeriodManager vacationPeriodManager, 
            IMapper mapper, 
            IValidator<CreateVacationPeriodRequest> createVacationPeriodRequestValidator,
            IValidator<GetVacationPeriodsByDatesRequest> getVacationPeriodRequestValidator)
        {
            _createVacationPeriodRequestValidator = createVacationPeriodRequestValidator;
            _getVacationPeriodRequestValidator = getVacationPeriodRequestValidator;
            _mapper = mapper;
            _vacationPeriodManager = vacationPeriodManager;
        }


        [ProducesResponseType(typeof(ApiResponse<GetVacationPeriodsByDatesResponse>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [HttpGet("")]
        public async Task<IActionResult> Get([FromQuery]GetVacationPeriodsByDatesRequest request, CancellationToken cancellationToken = default(CancellationToken))
        {
            var validationResult = _getVacationPeriodRequestValidator.Validate(request);
            if (validationResult.IsValid != true)
            {
                return BadRequest(validationResult);
            }

            var vacationPeriods = request.From.CompareTo(request.To) == 0
                ? await _vacationPeriodManager.GetAsync(request.From.Date, cancellationToken)
                : await _vacationPeriodManager.GetAsync(request.From.Date, request.To.Date, cancellationToken);

            //TODO: probably that is ok, but front throws errors for no reason
            //if (!vacationPeriods.Any())
            //{
            //    return NotFound();
            //}

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
            var validationResult = _createVacationPeriodRequestValidator.Validate(request);
            if (validationResult?.IsValid != true)
            {
                return BadRequest(validationResult);
            }

            var vacationPeriod = _mapper.Map<VacationPeriod>(request);
            var createdVacationPeriod = await _vacationPeriodManager.CreateAsync(vacationPeriod, cancellationToken);

            // createdVacationPeriod should be returned by the manager.
            // If something went wrong then exception was handled by middleware, so we do not expect null value

            var result = _mapper.Map<CreateVacationPeriodResponse>(createdVacationPeriod);
            return Ok(result);
        }
    }
}
