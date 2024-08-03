using API.DTOs;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class DriversController(IDriversRepository driversRepository, IMapper mapper) : BaseApiController
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
            driver.ActionsLog.Add($"{DateTime.UtcNow} - Soferul {driver.FirstName + ' ' + driver.LastName} a fost adaugat.");

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

        if (selectedDriver == null) return BadRequest("Acest sofer nu a putut fi gasit.");

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
