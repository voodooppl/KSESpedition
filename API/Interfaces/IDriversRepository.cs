using API.Entities;
using API.Helpers;

namespace API;

public interface IDriversRepository
{
    public Task<PagedList<Driver>> GetDriversAsync(DriverParams userParams);
    public Task<Driver?> GetDriverByCNPAsync(string cnp);
    public Task<bool> AddDriverAsync(Driver driver);
    public Task<bool> DeleteDriverAsync(string cnp);
    public Task<bool> SaveAllAsync();
}
