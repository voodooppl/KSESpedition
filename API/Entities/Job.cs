namespace API.Entities;

public class Job
{
    public int Id { get; set;}
    public DateTime? StartDate { get; set; } = DateTime.UtcNow;
    public DateTime? EndDate { get; set; } = DateTime.UtcNow.AddDays(1);
    public string? StartPoint { get; set; }
    public string? Destination { get; set; }
    public string? TransportingFirm { get; set; }
    public string? Client { get; set; }
    public string? TransportedGoods { get; set; }
    public int? KM { get; set; }
    public List<Expense>? Expenses { get; set; } = new List<Expense>();
    public int? Income { get; set; }
    public int? Profit { get; set; }
    public List<string>? Log { get; set; } = new List<string>();
    public string? Details { get; set; }
    //Navigation properties
    public List<Driver>? Drivers { get; set; }
    public List<Truck>? Trucks { get; set; }
}