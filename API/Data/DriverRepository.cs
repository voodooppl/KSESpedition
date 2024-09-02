using API.Entities;
using API.Helpers;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DriverRepository(DataContext context, IMapper mapper) : IDriversRepository
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
        var driver = await context.Drivers
            .Where(d => d.CNP == cnp)
            .SingleOrDefaultAsync();

        return driver;
    }

    public async Task<PagedList<Driver>> GetDriversAsync(DriverParams userParams)
    {
        var query = context.Drivers.AsQueryable();

        if (userParams.ContractStatus != null)
        {
            query = query.Where(q => q.ContractStatus == userParams.ContractStatus);
        }

        query = userParams.OrderBy switch
        {
            "idExpirationDate" => query.OrderBy(u => u.IdNumberExpirationDate),
            "driverLicenceExpirationDate" => query.OrderBy(u => u.DriverLicenceExpirationDate),
            "dateOfBirth" => query.OrderBy(u => u.DateOfBirt),
            "lastName" => query.OrderBy(u => u.LastName),
            _ => query.OrderBy(u => u.CreationDate)
        };

        return await PagedList<Driver>.CreateAsync(query.ProjectTo<Driver>(mapper.ConfigurationProvider),
                 userParams.PageNumber, userParams.PageSize);
    }

    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }

}
