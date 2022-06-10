namespace VacationCalendar.Api.Mappers
{
    using AutoMapper;
    using VacationCalendar.Api.Dtos;
    using VacationCalendar.Api.Requests.VacationPeriod;
    using VacationCalendar.Api.Responses.VacationPeriod;
    using VacationCalendar.BusinessLogic.Models;

    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<CreateVacationPeriodRequest, VacationPeriod>()
                .ForMember(dest => dest.User, opts => opts.MapFrom(src => new User { FirstName = src.FirstName, LastName = src.LastName }));
            CreateMap<VacationPeriod, CreateVacationPeriodResponse>()
                .ForMember(dest => dest.UserId, opts => opts.MapFrom(src => src.User.Id))
                .ForMember(dest => dest.FirstName, opts => opts.MapFrom(src => src.User.FirstName))
                .ForMember(dest => dest.LastName, opts => opts.MapFrom(src => src.User.LastName));
        }
    }
}
