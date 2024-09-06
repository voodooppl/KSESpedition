using API.DTOs;
using API.Entities;
using API.Enums;
using API.Extensions;
using API.Helpers;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class DriversController(IDriversRepository driversRepository, IMapper mapper, ValuesUpdateVerifier valuesUpdateVerifier) : BaseApiController()
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Driver>>> GetDriversAsync([FromQuery] DriverParams driverParams)
    {
        var drivers = await driversRepository.GetDriversAsync(driverParams);
        Response.AddPaginationHeader(drivers);

        return Ok(drivers);
    }

    [HttpGet("{cnp}")]
    public async Task<ActionResult<Driver>> GetDriverByCnp(string cnp)
    {
        var driver = await driversRepository.GetDriverByCNPAsync(cnp);
        if (driver == null) return NotFound();

        return driver;
    }

    [HttpPost("add-new-driver")]
    public async Task<ActionResult<Driver>> AddDriverAsync(DriverDto driver)
    {
        if (driver == null) return BadRequest("Please add a valid driver.");

        if (await driversRepository.GetDriverByCNPAsync(driver.CNP) != null) return BadRequest("Driver already exists.");

        var newDriver = new Driver
        {
            FirstName = driver.FirstName,
            LastName = driver.LastName,
            CNP = driver.CNP,
            TelNumber = driver.TelNumber,
            DateOfBirt = Driver.GetDateOfBirth(driver.CNP)
        };

        mapper.Map(driver, newDriver);

        var loggedInUserEmail = User.GetLoggedUserEmail();
        newDriver.Log?.Add($"{DateTime.UtcNow} - Userul {loggedInUserEmail} a adaugat soferul {driver.FirstName + " " + driver.LastName}.");

        if (!await driversRepository.AddDriverAsync(newDriver))
        {
            throw new Exception("Unable to add driver.");
        }

        return Ok(newDriver);
    }

    [HttpPut]
    public async Task<ActionResult<Driver>> UpdateDriver(DriverDto driver)
    {
        var existingDriver = await driversRepository.GetDriverByCNPAsync(driver.CNP);

        if (existingDriver == null) return NotFound("Driver not found.");

        var loggedInUserEmail = User.GetLoggedUserEmail();
        var updatedValues = valuesUpdateVerifier.GetModifiedProperties(driver, existingDriver);

        mapper.Map(driver, existingDriver);

        if (updatedValues.Any())
        {
            foreach (var value in updatedValues)
            {
                var propertyName = value.Key;
                var oldValue = value.Value.OldValue;
                var newValue = value.Value.NewValue;

                if(propertyName == "ContractStatus"){
                    newValue = existingDriver.ContractStatus;
                }

                existingDriver.Log?.Add(@$"{DateTime.UtcNow}: Userul {loggedInUserEmail} 
                    a modificat {propertyName} din ""{oldValue}"" in ""{newValue}""");
            };
        }

        if (await driversRepository.SaveAllAsync()) return existingDriver;

        return BadRequest("Could not save driver.");
    }

    [HttpDelete("driver-details/{cnp}")]
    public async Task<ActionResult<bool>> DeleteDriverAsync(string cnp)
    {
        if (cnp == null) return BadRequest("Null cnp.");

        return Ok(await driversRepository.DeleteDriverAsync(cnp));
    }
}
