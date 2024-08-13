namespace API.Entities;

public class Expense
{
    public int Id { get; set;}
    public required DateOnly Date { get; set; }
    public required int Value { get; set; }
    public string? Name { get; set;}
    public required string Client { get; set; }
    public string? Supplier { get; set; }
    public string? Detail { get; set;}
    public bool? Paid { get; set; }
    //Navigation properties
    public int DriverId { get; set; }
    public int TruckId { get; set; }
    public int JobId { get; set; }
    public Driver Driver { get; set; } = null!;
    public Truck Truck { get; set; } = null!;
    public Job Job { get; set; } = null!;
}