using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using API.Enums;
using API.Helpers;

namespace API.Entities;

public class Driver
{
    public int Id { get; set; }
    public DateTime CreationDate { get; set; } = DateTime.UtcNow;
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    [Length(13, 13)]
    public required string CNP { get; set; }
    public required string TelNumber { get; set; }
    public string? Employer { get; set; } = string.Empty;
    public string? Address { get; set; } = string.Empty;
    public DateOnly DateOfBirt { get; set; }
    public string? IdNumber { get; set; } = string.Empty;
    public DateOnly? IdNumberExpirationDate { get; set; } = DateOnly.FromDateTime(DateTime.UtcNow);
    public string? DriverLicenceNumber { get; set; } = string.Empty;
    public DateOnly? DriverLicenceExpirationDate { get; set; } = DateOnly.FromDateTime(DateTime.UtcNow);
    public string? ContractNumber { get; set; } = string.Empty;
    public DriverContractStatuses? ContractStatus { get; set; } = DriverContractStatuses.Active;
    public List<Expense>? Expenses { get; set;} = new List<Expense>();
    public List<string>? Log { get; set; } = new List<string>();
    public string? Details { get; set; } = string.Empty;
    //Navigation properties
    public int? TruckId { get; set; }
    public Truck? Truck { get; set; }
    public int? JobId { get; set; }
    public Job? Job { get; set; }

    public static DateOnly GetDateOfBirth(string cnp)
    {
        var cnpYear = int.Parse(cnp.Substring(1, 2)) + 2000;
        if (cnpYear >= DateTime.Now.Year)
            cnpYear -= 100;

        var year = cnpYear;
        var month = int.Parse(cnp.Substring(3, 2));
        var day = int.Parse(cnp.Substring(5, 2));
        return new DateOnly(year, month, day);
    }
}
