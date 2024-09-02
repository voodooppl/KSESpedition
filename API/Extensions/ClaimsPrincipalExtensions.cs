using System.Security.Claims;

namespace API.Extensions;

public static class ClaimsPrincipalExtensions
{
    public static int GetUserId(this ClaimsPrincipal user)
    {
        var userId = int.Parse(user.FindFirstValue(ClaimTypes.NameIdentifier) ??
            throw new Exception("Could not find id from token"));

        return userId;
    }

    public static string GetLoggedUserEmail(this ClaimsPrincipal user)
    {
        var userEmail = user.FindFirstValue(ClaimTypes.Email) ??
            throw new Exception("Could not find email from token");

        return userEmail;
    }
}