using API.DTOs;
using API.Entities;
using API.Enums;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class TrucksController(ITruckRepository truckRepository, IMapper mapper, ValuesUpdateVerifier valuesUpdateVerifier) : BaseApiController()
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Truck>>> GetTrucksAsync()
    {
        var trucks = await truckRepository.GetTrucksAsync();

        return Ok(trucks);
    }

    [HttpGet("{licenceNumber}")]
    public async Task<ActionResult<Truck>> GetTruckByLicenceNumber(string licenceNumber)
    {
        if (licenceNumber == null) return BadRequest("Null licence number.");
        var truck = await truckRepository.GetTruckByLicenceNumberAsync(licenceNumber);
        if (truck == null) return NotFound();

        return Ok(truck);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Truck>> GetTruckById(int id)
    {
        if (id == 0) return BadRequest("Null id number.");
        var truck = await truckRepository.GetTruckByIdAsync(id);
        if (truck == null) return NotFound();

        return Ok(truck);
    }

    [HttpPost("add-new-truck")]
    public async Task<ActionResult<Truck>> AddTruck(Truck truck)
    {
        if (truck == null) return BadRequest("Invalid truck");

        if (await truckRepository.GetTruckByLicenceNumberAsync(truck.LicenceNumber) != null) return BadRequest("Truck already exists.");

        if (truck != null)
        {
            if (!truck.FabricationDate.HasValue) truck.FabricationDate = DateOnly.FromDateTime(DateTime.UtcNow);
            if (!truck.InsurranceExpirationDate.HasValue) truck.InsurranceExpirationDate = DateOnly.FromDateTime(DateTime.UtcNow);
            if (!truck.ITPExpirationDate.HasValue) truck.ITPExpirationDate = DateOnly.FromDateTime(DateTime.UtcNow);
            if (!truck.RoVignetteExpirationDate.HasValue) truck.RoVignetteExpirationDate = DateOnly.FromDateTime(DateTime.UtcNow);
            if (!truck.GermanVignetteExpirationDate.HasValue) truck.GermanVignetteExpirationDate = DateOnly.FromDateTime(DateTime.UtcNow);
            if (!truck.Status.HasValue) truck.Status = TruckStatuses.Active;

            var loggedInUserEmail = User.GetLoggedUserEmail();
            truck.Log?.Add(@$"{DateTime.UtcNow} - Userul {loggedInUserEmail} a adaugat camionul 
                {truck.Manufacturer + ' ' + truck.Model} cu VIN {truck.VIN} si nr. inmatriculare {truck.LicenceNumber}.");

            await truckRepository.AddTruckAsync(truck);
            await truckRepository.SaveChangesAsync();
        }

        return Ok(truck);
    }

    [HttpPut]
    public async Task<ActionResult> UpdateTruck(UpdateTruckDto updateTruckDto)
    {
        var existingTruck = await truckRepository.GetTruckByIdAsync(updateTruckDto.Id);
        if (existingTruck == null) return NotFound("The truck could not be found.");

        var loggedInUserEmail = User.GetLoggedUserEmail();
        var updatedValues = valuesUpdateVerifier.GetModifiedProperties(updateTruckDto, existingTruck);

        if (updatedValues.Any())
        {
            foreach (var value in updatedValues)
            {
                var propertyName = value.Key;
                var oldValue = value.Value.OldValue;
                var newValue = value.Value.NewValue;

                updateTruckDto.Log?.Add(@$"{DateTime.UtcNow}: Userul {loggedInUserEmail} 
                a modificat {propertyName} din {oldValue} in {newValue}");
            };
        }

        mapper.Map(updateTruckDto, existingTruck);

        if (await truckRepository.SaveChangesAsync()) return NoContent();

        return BadRequest("Nu s-a putut finaliza salvarea.");
    }

    [HttpDelete("{licenceNumber}")]
    public async Task<ActionResult<bool>> DeleteTruck(string licenceNumber)
    {
        if (licenceNumber == null) return BadRequest("Null licence number");

        return Ok(await truckRepository.DeleteTruckAsync(licenceNumber));
    }

}
