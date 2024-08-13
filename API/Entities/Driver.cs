using System.ComponentModel.DataAnnotations;
using API.Enums;

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
    public string? Employer { get; set; }
    public string? Address { get; set; }
    public DateOnly DateOfBirt { get; set; }
    public string? IdNumber { get; set; }
    public DateOnly? IdNumberExpirationDate { get; set; } = DateOnly.FromDateTime(DateTime.UtcNow);
    public string? DriverLicenceNumber { get; set; }
    public DateOnly? DriverLicenceExpirationDate { get; set; } = DateOnly.FromDateTime(DateTime.UtcNow);
    public string? ContractNumber { get; set; }
    public DriverContractStatuses? ContractStatus { get; set; } = DriverContractStatuses.Active;
    public List<Expense>? Expenses { get; set;} = new List<Expense>();
    public List<string>? Log { get; set; } = new List<string>();
    public string? Details { get; set; }
    //Navigation properties
    public int? TruckId { get; set; }
    public Truck? Truck { get; set; }
    public int? JobId { get; set; }
    public Job? Job { get; set; }

    public DateOnly GetDateOfBirth(Driver driver)
    {
        var cnpYear = int.Parse(driver.CNP.Substring(1, 2)) + 2000;
        if (cnpYear >= DateTime.Now.Year)
            cnpYear -= 100;

        var year = cnpYear;
        var month = int.Parse(driver.CNP.Substring(3, 2));
        var day = int.Parse(driver.CNP.Substring(5, 2));
        return new DateOnly(year, month, day);
    }
}
