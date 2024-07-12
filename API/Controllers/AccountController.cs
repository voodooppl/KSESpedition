using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(DataContext dataContext, ITokenService tokenService) : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if (await UserExists(registerDto.Email)) return BadRequest("This email address already exists.");
        using var hmac = new HMACSHA512();
        var user = new AppUser
        {
            FirstName = ToTitleCase(registerDto.FirstName),
            LastName = ToTitleCase(registerDto.LastName),
            Email = registerDto.Email.ToLower(),
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
            PasswordSalt = hmac.Key
        };
        dataContext.Add(user);
        await dataContext.SaveChangesAsync();

        return new UserDto
        {
            FirstName = registerDto.FirstName,
            Token = tokenService.CreateToken(user),
        };
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await dataContext.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == loginDto.Email);
        if (user == null) return Unauthorized("Invalid username.");

        using var hmac = new HMACSHA512(user.PasswordSalt);

        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
        for (int i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
        }

        return new UserDto
        {
            FirstName = user.FirstName,
            Token = tokenService.CreateToken(user),
        };
    }

    private async Task<bool> UserExists(string email)
    {
        return await dataContext.Users.AnyAsync(u => u.Email.ToLower() == email.ToLower());
    }

    public static string ToTitleCase(string input)
    {
        if (string.IsNullOrEmpty(input))
            return input;

        var words = input.Split(' ');
        for (int i = 0; i < words.Length; i++)
        {
            if (!string.IsNullOrEmpty(words[i]))
            {
                char[] letters = words[i].ToCharArray();
                letters[0] = char.ToUpper(letters[0]);
                for (int j = 1; j < letters.Length; j++)
                {
                    letters[j] = char.ToLower(letters[j]);
                }
                words[i] = new string(letters);
            }
        }
        return string.Join(" ", words);
    }
}
