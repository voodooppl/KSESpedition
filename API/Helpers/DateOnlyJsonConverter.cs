using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;
using AutoMapper;

namespace API.Helpers;

public class StringToDateOnlyConverter : ITypeConverter<string, DateOnly>
{
    private const string Format = "yyyy-MM-dd";

    public DateOnly Convert(string source, DateOnly destination, ResolutionContext context)
    {
        if(string.IsNullOrWhiteSpace(source)) return DateOnly.FromDateTime(DateTime.Now);

        return DateOnly.ParseExact(source, Format, CultureInfo.InvariantCulture);
    }
}