﻿using System.Text.Json.Serialization;

namespace API.Enums;

// [JsonConverter(typeof(JsonStringEnumConverter))]
public enum DriverContractStatuses
{
    Active,
    Suspended,
    Inactive,
}
