using API.Entities;
using API.Enums;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

// [Authorize]
public class DriversController(IDriversRepository driversRepository) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Driver>>> GetDriversAsync()
    {
        var drivers = await driversRepository.GetDriversAsync();


        return Ok(drivers);
    }

    // [HttpGet("{attribute}")]
    // public async Task<ActionResult<Driver>> GetDriverByAttribute(string attribute)
    // {
    //     var driver = await driversRepository.GetDriverByCNPAsync(attribute);
    //     if (driver == null) 
    //     {
    //         driver = await driversRepository.GetDriverByNameAsync(attribute);
    //     }

    //     return NotFound();

    //     return Ok(driver);
    // }

    // [HttpGet("/{name}")]
    // public async Task<ActionResult<IEnumerable<Driver>>> GetDriverByName(string name)
    // {
    //     var driver = await driversRepository.GetDriverByNameAsync(name);
    //     if (driver == null) return NotFound();

    //     return Ok(driver);
    // }

    [HttpPost("add-new-driver")]
    public async Task<ActionResult<Driver>> AddDriverAsync(Driver driver)
    {
        if (driver == null) return BadRequest("Please add a valid driver.");

        if (await driversRepository.GetDriverByCNPAsync(driver.CNP) != null) return BadRequest("Driver already exists.");

        if (driver != null)
        {
            driver.DateOfBirt = driver.GetDateOfBirth(driver);
            driver.DriverLicenceExpirationDate = DateOnly.FromDateTime(DateTime.UtcNow);
            driver.DrivingCertificateExpirationDate = DateOnly.FromDateTime(DateTime.UtcNow);
            driver.ContractStatus = DriverContractStatuses.Active;
        }

        if (!await driversRepository.AddDriverAsync(driver))
        {
            throw new Exception("Unable to add driver.");
        }

        return Ok(driver);
    }

    [HttpDelete]
    public async Task<ActionResult<bool>> DeleteDriverAsync(Driver driver)
    {
        if (driver == null) return BadRequest("NUll driver.");
        if (await driversRepository.GetDriverByCNPAsync(driver.CNP) == null) return BadRequest("Selected driver doesn't exist.");

        return Ok(await driversRepository.DeleteDriverAsync(driver));
    }
}
