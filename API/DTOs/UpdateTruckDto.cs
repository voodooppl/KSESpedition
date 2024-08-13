using API.Entities;
using API.Enums;

namespace API.DTOs;

public class UpdateTruckDto
{
    public int Id { get; set; }
    public required string VIN { get; set; }
    public required string LicenceNumber { get; set; }
    public string? Manufacturer { get; set; }
    public string? Model { get; set; }
    public int? EngineCapacity { get; set; }
    public int? HorsePower { get; set; }
    public FuelTypes? FuelType { get; set; }
    public int? KmOnBoard { get; set; }
    public DateOnly? FabricationDate { get; set; }
    public TruckStatuses? Status { get; set; }
    public string? Owner { get; set; }
    public DateOnly? ITPExpirationDate { get; set; }
    public DateOnly? InsurranceExpirationDate { get; set; }
    public DateOnly? RoVignetteExpirationDate { get; set; }
    public DateOnly? GermanVignetteExpirationDate { get; set; }
    public DateOnly? NextRevisionDate { get; set; }
    public List<Expense>? Expenses { get; set;}
    public List<string>? Log { get; set; }
    public string? Details { get; set; }
    public List<Driver>? Drivers { get; set; }
    public int? JobId { get; set; }
    public Job? Job { get; set; }
}