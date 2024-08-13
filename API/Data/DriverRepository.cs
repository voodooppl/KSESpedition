using System.Security.Claims;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DriverRepository(DataContext context) : IDriversRepository
{
    public async Task<bool> AddDriverAsync(Driver driver)
    {
        if (driver != null)
        {
            context.Drivers.Add(driver);
            await context.SaveChangesAsync();

            return true;
        }
        return false;
    }

    public async Task<bool> DeleteDriverAsync(string cnp)
    {
        var driver = await context.Drivers.FirstOrDefaultAsync(d => d.CNP == cnp);
        if (driver != null)
        {
            context.Drivers.Remove(driver);
            await context.SaveChangesAsync();

            return true;
        }
        return false;
    }

    public async Task<Driver?> GetDriverByCNPAsync(string cnp)
    {
        var driver = await context.Drivers.FirstOrDefaultAsync(d => d.CNP == cnp);

        return driver;
    }

    public async Task<IEnumerable<Driver>> GetDriversAsync()
    {
        return await context.Drivers.ToListAsync();
    }

    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }

}
