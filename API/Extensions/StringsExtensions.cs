using System.Globalization;
using System.Text;

namespace API.Extensions;

public static class StringExtensions
{
    public static string? ToTitleCase(this string? value)
    {
        if (string.IsNullOrWhiteSpace(value)) return value;
        var titleString = new StringBuilder();

        var splitString = value.Split(' ');

        foreach (var str in splitString)
        {
            titleString.Append(CultureInfo.CurrentCulture.TextInfo.ToTitleCase(str.ToLower()));
            titleString.Append(' ');
        }

        if(titleString.Length > 0) titleString.Length--;

        return titleString.ToString();
    }
}