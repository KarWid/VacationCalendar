namespace VacationCalendar.BusinessLogic.Mappers
{
    using AutoMapper;
    using VacationCalendar.BusinessLogic.Models;
    using VacationCalendar.Repository.Entities;

    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<User, UserEntity>().ReverseMap();
            CreateMap<VacationPeriod, VacationPeriodEntity>()
                .ForMember(dest => dest.UserId, opts => opts.MapFrom(src => src.User.Id))
                .ForMember(dest => dest.User, opts => opts.Ignore()) // do not map user to entity
                .ReverseMap();
        }
    }
}
