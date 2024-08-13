using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<UpdateDriverDto, Driver>();
        CreateMap<UpdateTruckDto, Truck>();
    }
}