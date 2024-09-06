using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class TruckRepository(DataContext context, IMapper mapper) : ITruckRepository
{
    public async Task<PagedList<Truck>> GetTrucksAsync(TruckParams truckParams)
    {

        var query = context.Trucks.AsQueryable();

        if (truckParams.TruckStatuses != null)
        {
            query = query.Where(t => t.Status == truckParams.TruckStatuses);
        }

        if (truckParams.FuelTypes != null)
        {
            query = query.Where(t => t.FuelType == truckParams.FuelTypes);
        }

        query = truckParams.OrderBy switch
        {
            "manufacturer" => query.OrderBy(t => t.Manufacturer),
            "model" => query.OrderBy(t => t.Model),
            "fabricationDate" => query.OrderBy(t => t.FabricationDate),
            "engineCapacity" => query.OrderBy(t => t.EngineCapacity),
            "horsePower" => query.OrderBy(t => t.HorsePower),
            "insurranceExpirationDate" => query.OrderBy(t => t.InsurranceExpirationDate),
            "roVignetteExpirationDate" => query.OrderBy(t => t.RoVignetteExpirationDate),
            "iTPExpirationDate" => query.OrderBy(t => t.ITPExpirationDate),
            "kmOnBoard" => query.OrderBy(t => t.KmOnBoard),
            "nextRevisionDate" => query.OrderBy(t => t.NextRevisionDate),
            _ => query.OrderBy(t => t.CreationDate),
        };

        return await PagedList<Truck>.CreateAsync(query.ProjectTo<Truck>(mapper.ConfigurationProvider),
            truckParams.PageNumber, truckParams.PageSize);
    }

    public async Task<Truck?> GetTruckByLicenceNumberAsync(string licenceNumber)
    {
        return await context.Trucks
            .Where(t => t.LicenceNumber == licenceNumber)
            .SingleOrDefaultAsync();
    }

    public async Task<Truck?> GetTruckByIdAsync(int id)
    {
        return await context.Trucks
            .Where(t => t.Id == id)
            .SingleOrDefaultAsync();
    }

    public async Task<bool> AddTruckAsync(Truck truck)
    {
        if (truck != null)
        {
            context.Trucks.Add(truck);
            await context.SaveChangesAsync();

            return true;
        }
        return false;
    }

    public async Task<bool> DeleteTruckAsync(string licenceNumber)
    {
        var truck = await context.Trucks.FirstOrDefaultAsync(t => t.LicenceNumber == licenceNumber);
        if (truck != null)
        {
            context.Trucks.Remove(truck);
            await context.SaveChangesAsync();

            return true;
        }
        return false;
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }
}