using API.DTOs;
using API.Entities;
using API.Enums;
using API.Extensions;
using AutoMapper;

namespace API.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<string, DateOnly>().ConvertUsing<StringToDateOnlyConverter>();
        CreateMap<Driver, Driver>();
        CreateMap<Truck, Truck>();
        // CreateMap<string, FuelTypes>();
        // CreateMap<string, TruckStatuses>();
        // CreateMap<string, DriverContractStatuses>();

        
        CreateMap<DriverDto, Driver>()
        .ForMember(d => d.FirstName, opt => opt.MapFrom(src => src.FirstName.ToTitleCase()))
        .ForMember(d => d.LastName, opt => opt.MapFrom(src => src.LastName.ToTitleCase()))
        .ForMember(d => d.Address, opt => opt.MapFrom(src => src.Address.ToTitleCase()))
        .ForMember(d => d.IdNumber, opt => opt.MapFrom(src => src.IdNumber.ToUpper()))
        .ForMember(d => d.Employer, opt => opt.MapFrom(src => src.Employer.ToUpper()))
            .ForAllMembers(opts => opts.Condition((source, destination, sourceMember) => 
                sourceMember != null && 
                !(sourceMember is string str && string.IsNullOrWhiteSpace(str))
            ));
            
        CreateMap<TruckDto, Truck>()
        .ForMember(t => t.LicenceNumber, opt => opt.MapFrom(src => src.LicenceNumber.ToUpper()))
        .ForMember(t => t.VIN, opt => opt.MapFrom(src => src.VIN.ToUpper()))
        .ForMember(t => t.Manufacturer, opt => opt.MapFrom(src => src.Manufacturer.ToTitleCase()))
        .ForMember(t => t.Model, opt => opt.MapFrom(src => src.Model.ToTitleCase()))
        .ForMember(t => t.Owner, opt => opt.MapFrom(src => src.Owner.ToUpper()))
            .ForAllMembers(opts => opts.Condition((source, destination, sourceMember) => 
                sourceMember != null && 
                !(sourceMember is string str && string.IsNullOrWhiteSpace(str))
            ));
    }

}