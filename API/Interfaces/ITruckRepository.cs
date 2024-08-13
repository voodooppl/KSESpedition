using API.Entities;

namespace API.Interfaces;

public interface ITruckRepository
{
    public Task<IEnumerable<Truck>> GetTrucksAsync();
    public Task<Truck?> GetTruckByLicenceNumberAsync(string licenceNumber);
    public Task<Truck?> GetTruckByIdAsync(int id);
    public Task<bool> AddTruckAsync(Truck truck);
    public Task<bool> DeleteTruckAsync(string licenceNumber);
    public Task<bool> SaveChangesAsync();
}