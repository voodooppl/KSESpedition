using API.DTOs;
using API.Entities;
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
    public async Task<ActionResult<IEnumerable<Truck>>> GetTrucksAsync([FromQuery] TruckParams truckParams)
    {
        var trucks = await truckRepository.GetTrucksAsync(truckParams);
        Response.AddPaginationHeader(trucks);

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
    public async Task<ActionResult<Truck>> AddTruck(TruckDto truck)
    {
        if (truck == null) return BadRequest("Invalid truck");

        if (await truckRepository.GetTruckByLicenceNumberAsync(truck.LicenceNumber) != null) return BadRequest("Truck already exists.");

        var newTruck = new Truck
        {
            LicenceNumber = truck.LicenceNumber,
            VIN = truck.VIN,
            Manufacturer = truck.Manufacturer,
            Model = truck.Model,
        };

        mapper.Map(truck, newTruck);

        var loggedInUserEmail = User.GetLoggedUserEmail();
        newTruck.Log?.Add(@$"{DateTime.UtcNow} - Userul {loggedInUserEmail} a adaugat camionul 
                {truck.Manufacturer + ' ' + truck.Model} cu VIN {truck.VIN} si nr. inmatriculare {truck.LicenceNumber}.");

        if (!await truckRepository.AddTruckAsync(newTruck))
        {
            throw new Exception("Unable to add truck.");
        }

        return Ok(newTruck);
    }

    [HttpPut]
    public async Task<ActionResult<Truck>> UpdateTruck(TruckDto truck)
    {
        var existingTruck = await truckRepository.GetTruckByIdAsync(truck.Id);
        if (existingTruck == null) return NotFound("The truck could not be found.");

        var loggedInUserEmail = User.GetLoggedUserEmail();
        var updatedValues = valuesUpdateVerifier.GetModifiedProperties(truck, existingTruck);

        mapper.Map(truck, existingTruck);

        if (updatedValues.Any())
        {
            foreach (var value in updatedValues)
            {
                var propertyName = value.Key;
                var oldValue = value.Value.OldValue;
                var newValue = value.Value.NewValue;

                if (propertyName == "Status")
                {
                    newValue = existingTruck.Status;
                }

                if (propertyName == "FuelType")
                {
                    newValue = existingTruck.FuelType;
                }

                existingTruck.Log?.Add(@$"{DateTime.UtcNow}: Userul {loggedInUserEmail} 
                a modificat {propertyName} din ""{oldValue}"" in ""{newValue}""");
            };
        }


        if (await truckRepository.SaveChangesAsync()) return existingTruck;

        return BadRequest("Could not save truck.");
    }

    [HttpDelete("{licenceNumber}")]
    public async Task<ActionResult<bool>> DeleteTruck(string licenceNumber)
    {
        if (licenceNumber == null) return BadRequest("Null licence number");

        return Ok(await truckRepository.DeleteTruckAsync(licenceNumber));
    }

}
