using API.Enums;

namespace API.Helpers;

public class DriverParams
{
    private const int MaxPageSize = 20;
    private int _pageSize = 10;
    public int PageNumber { get; set; }
    public DriverContractStatuses? ContractStatus { get; set; }
    public string OrderBy { get; set; } = "created";


    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
    }
}