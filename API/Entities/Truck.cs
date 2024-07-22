using API.Enums;

namespace API.Entities;

public class Truck
{
    public int Id { get; set;}
    public string? VIN { get; set;}
    public required string LicenceNumber { get; set; }
    public string? Manufacturer { get; set; }
    public string? Model { get; set; }
    public int EngineCapacity { get; set; }
    public int HorsePower { get; set; }
    public DateTime FabricationDate { get; set; }
    public TruckStatuses Status { get; set; }
    public DateTime ITPExpirationDate { get; set; }
    public DateTime InsurranceExpirationDate { get; set; }
    public DateTime RoVignetteExpirationDate { get; set; }
    public DateTime GermanVignetteExpirationDate { get; set; }
    public Driver? AssignedDriver { get; set; } 
}
