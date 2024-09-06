using System.Text.Json.Serialization;

namespace API.Enums;

// [JsonConverter(typeof(JsonStringEnumConverter))]
public enum FuelTypes
{
    Diesel,
    Petrol,
    Hybrid,
    Electric
}