using API.DTOs;
using API.Entities;

namespace API;

public interface IDriversRepository
{
    public Task<IEnumerable<Driver>> GetDriversAsync();
    public Task<Driver?> GetDriverByCNPAsync(string cnp);
    // public Task<Driver?> GetDriverByIdAsync(int id);
    // public Task<IEnumerable<Driver?>> GetDriverByNameAsync(string name);
    public Task<bool> AddDriverAsync(Driver driver);
    // public void UpdateDriverAsync(UpdateDriverDto driver);
    public Task<bool> DeleteDriverAsync(string cnp);
    public Task<bool> SaveAllAsync();
}
