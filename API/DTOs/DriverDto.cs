using API.Entities;

namespace API.DTOs;

public class DriverDto
{
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string CNP { get; set; }
    public required string TelNumber { get; set; }
    public string? Employer { get; set; }
    public string? Address { get; set; }
    public string? IdNumber { get; set; }
    public DateOnly? IdNumberExpirationDate { get; set; }
    public string? DriverLicenceNumber { get; set; }
    public DateOnly? DriverLicenceExpirationDate { get; set; }
    public string? ContractNumber { get; set; }
    public string? ContractStatus { get; set; }
    public List<Expense>? Expenses { get; set; } 
    public List<string>? Log { get; set; } 
    public string? Details { get; set; }
    //Navigation properties
    public int? TruckId { get; set; }
    public Truck? Truck { get; set; }
    public int? JobId { get; set; }
    public Job? Job { get; set; }
}