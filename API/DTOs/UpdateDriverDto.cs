using API.Enums;

namespace API.DTOs;

public class UpdateDriverDto
{
    public required string CNP { get; set; }
    public required string TelNumber { get; set; }
    public string? Address { get; set; }
    public DateOnly DateOfBirt { get; set; }
    public string? DriverLicenceNumber { get; set; }
    public DateOnly DriverLicenceExpirationDate { get; set; }
    public string? ContractNumber { get; set; }
    public DriverContractStatuses ContractStatus { get; set; }
    public List<string> ActionsLog { get; set; } = [];
}