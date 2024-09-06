using System.Text.Json.Serialization;

namespace API.Enums;

// [JsonConverter(typeof(JsonStringEnumConverter))]
public enum TruckStatuses
{
    Active,
    Inactive,
    Sold,
    Disposed
}
