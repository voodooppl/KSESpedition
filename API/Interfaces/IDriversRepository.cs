using API.DTOs;
using API.Entities;

namespace API;

public interface IDriversRepository
{
    public Task<IEnumerable<Driver>> GetDriversAsync();
    public Task<Driver?> GetDriverByCNPAsync(string cnp);
    public Task<IEnumerable<Driver?>> GetDriverByNameAsync(string name);
    public Task<bool> AddDriverAsync(Driver driver);
    public void UpdateDriverAsync(Driver driver);
    public Task<bool> DeleteDriverAsync(Driver driver);
    public Task<bool> SaveAllAsync();
}
