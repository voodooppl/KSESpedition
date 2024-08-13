using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BaseApiController(IHttpContextAccessor httpContextAccessor) : ControllerBase
{
    public string? GetLoggedUserEmail()
    {
        return httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    }
}
