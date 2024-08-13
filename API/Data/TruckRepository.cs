using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class TruckRepository(DataContext context) : ITruckRepository
{
    public async Task<IEnumerable<Truck>> GetTrucksAsync()
    {
        return await context.Trucks.ToListAsync();
    }

    public async Task<Truck?> GetTruckByLicenceNumberAsync(string licenceNumber)
    {
        return await context.Trucks.FirstOrDefaultAsync(t => t.LicenceNumber == licenceNumber);
    }

    public async Task<Truck?> GetTruckByIdAsync(int id)
    {
        return await context.Trucks.FirstOrDefaultAsync(t => t.Id == id);
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