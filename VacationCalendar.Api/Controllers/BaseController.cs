namespace VacationCalendar.Api.Controllers
{
    using FluentValidation.Results;
    using Microsoft.AspNetCore.Mvc;
    using VacationCalendar.Api.Resources;
    using VacationCalendar.Api.Responses.BaseResponses;

    [ApiController]
    public class BaseController : ControllerBase
    {
        protected OkObjectResult Ok<T>(T value) where T : class
        {
            return base.Ok(new SuccessApiResponse<T>(value));
        }

        protected BadRequestObjectResult BadRequest(ValidationResult? validationResult)
        {
            if (validationResult == null)
            {
                return base.BadRequest(new BussinessLogicErrorApiResponse(GeneralResource.Something_Went_Wrong)); // TODO @KWidla
            }

            var result = new BussinessLogicErrorApiResponse(validationResult.Errors.Select(_ => _.ErrorMessage).ToList());
            return base.BadRequest(result);
        }

        protected NotFoundObjectResult NotFound(string errorMessage = "")
        {
            return base.NotFound(new NotFoundApiResponse(errorMessage));
        }
    }
}
