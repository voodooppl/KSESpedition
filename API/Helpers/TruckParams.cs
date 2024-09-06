using API.Enums;

namespace API.Helpers;

public class TruckParams
{
    private const int MaxPageSize = 20;
    private int _pageSize = 10;
    public int PageNumber { get; set; }
    public TruckStatuses? TruckStatuses { get; set; }
    public FuelTypes? FuelTypes { get; set; }
    public string OrderBy { get; set; } = "created";


    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
    }
}