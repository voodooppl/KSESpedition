using System.Security.Claims;
using API.DTOs;
using API.Entities;
using API.Enums;
using API.Helpers;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class DriversController(IDriversRepository driversRepository, IMapper mapper, ValuesUpdateVerifier valuesUpdateVerifier, IHttpContextAccessor httpContextAccessor) : BaseApiController(httpContextAccessor)
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Driver>>> GetDriversAsync()
    {
        var drivers = await driversRepository.GetDriversAsync();

        return Ok(drivers);
    }

    [HttpGet("{cnp}")]
    public async Task<ActionResult<Driver>> GetDriverByCnp(string cnp)
    {
        var driver = await driversRepository.GetDriverByCNPAsync(cnp);
        if (driver == null) return NotFound();

        return Ok(driver);
    }

    [HttpPost("add-new-driver")]
    public async Task<ActionResult<Driver>> AddDriverAsync(Driver driver)
    {
        if (driver == null) return BadRequest("Please add a valid driver.");

        if (await driversRepository.GetDriverByCNPAsync(driver.CNP) != null) return BadRequest("Driver already exists.");

        if (driver != null)
        {
            driver.DateOfBirt = driver.GetDateOfBirth(driver);

            if(!driver.IdNumberExpirationDate.HasValue) driver.IdNumberExpirationDate = DateOnly.FromDateTime(DateTime.UtcNow);
            if(!driver.DriverLicenceExpirationDate.HasValue) driver.DriverLicenceExpirationDate = DateOnly.FromDateTime(DateTime.UtcNow);
            if(!driver.ContractStatus.HasValue) driver.ContractStatus = DriverContractStatuses.Active;

            var loggedInUserEmail = GetLoggedUserEmail();
            driver.Log?.Add($"{DateTime.UtcNow} - Userul {loggedInUserEmail} a adaugat soferul {driver.FirstName + " " + driver.LastName}.");

            if (!await driversRepository.AddDriverAsync(driver))
            {
                throw new Exception("Unable to add driver.");
            }
        }

        return Ok(driver);
    }

    [HttpPut]
    public async Task<ActionResult> UpdateDriver(UpdateDriverDto updateDriverDto)
    {
        var selectedDriver = await driversRepository.GetDriverByCNPAsync(updateDriverDto.CNP);

        if (selectedDriver == null) return NotFound("Acest sofer nu a putut fi gasit.");

        var loggedInUserEmail = GetLoggedUserEmail();
        var updatedValues = valuesUpdateVerifier.GetModifiedProperties(updateDriverDto, selectedDriver);

        if (updatedValues.Any())
        {
            foreach (var value in updatedValues)
            {
                var propertyName = value.Key;
                var oldValue = value.Value.OldValue;
                var newValue = value.Value.NewValue;

                selectedDriver.Log?.Add(@$"{DateTime.UtcNow}: Userul {loggedInUserEmail} 
                a modificat {propertyName} din {oldValue} in {newValue}");
            };
        }

        mapper.Map(updateDriverDto, selectedDriver);

        if (await driversRepository.SaveAllAsync()) return NoContent();

        return BadRequest("Nu s-a putut finaliza salvarea.");
    }

    [HttpDelete("driver-details/{cnp}")]
    public async Task<ActionResult<bool>> DeleteDriverAsync(string cnp)
    {
        if (cnp == null) return BadRequest("Null cnp.");

        return Ok(await driversRepository.DeleteDriverAsync(cnp));
    }
}
