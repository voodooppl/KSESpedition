using API.Enums;

namespace API.Entities;

public class Truck
{
    public int Id { get; set;}
    public DateTime CreationDate { get; set; } = DateTime.UtcNow;
    public required string VIN { get; set;}
    public required string LicenceNumber { get; set; }
    public required string Manufacturer { get; set; }
    public required string Model { get; set; }
    public int? EngineCapacity { get; set; }
    public int? HorsePower { get; set; }
    public FuelTypes? FuelType { get; set; }
    public int? KmOnBoard { get; set; }
    public DateOnly? FabricationDate { get; set; } = DateOnly.FromDateTime(DateTime.UtcNow);
    public TruckStatuses? Status { get; set; } = TruckStatuses.Active;
    public string? Owner { get; set; }
    public DateOnly? ITPExpirationDate { get; set; } = DateOnly.FromDateTime(DateTime.UtcNow);
    public DateOnly? InsurranceExpirationDate { get; set; } = DateOnly.FromDateTime(DateTime.UtcNow);
    public DateOnly? RoVignetteExpirationDate { get; set; } = DateOnly.FromDateTime(DateTime.UtcNow);
    public DateOnly? GermanVignetteExpirationDate { get; set; } = DateOnly.FromDateTime(DateTime.UtcNow);
    public DateOnly? NextRevisionDate { get; set; } = DateOnly.FromDateTime(DateTime.UtcNow);
    public List<Expense>? Expenses { get; set;} = new List<Expense>();
    public List<string>? Log { get; set; } = new List<string>();
    public string? Details { get; set; }
    //Navigation properties
    public List<Driver>? Drivers { get; set; }
    public int? JobId { get; set; }
    public Job? Job { get; set; }
}
