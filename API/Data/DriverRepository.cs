using API.DTOs;
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

    public async Task<bool> DeleteDriverAsync(Driver driver)
    {
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
        return await context.Drivers.SingleOrDefaultAsync(d => d.CNP == cnp);
    }

    public async Task<IEnumerable<Driver?>> GetDriverByNameAsync(string name)
    {
        return await context.Drivers.Where(d => d.FirstName.Contains(name) 
                        || d.LastName.Contains(name)
                        || (d.FirstName + " " + d.LastName).Contains(name)
                        || (d.LastName + " " + d.FirstName).Contains(name)).ToListAsync();
    }

    public async Task<IEnumerable<Driver>> GetDriversAsync()
    {
        return await context.Drivers.ToListAsync();
    }

    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }

    public void UpdateDriverAsync(Driver driver)
    {
        context.Entry(driver).State = EntityState.Modified;
    }
}
