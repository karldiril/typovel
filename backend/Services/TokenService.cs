namespace backend.Services;

using System.Security.Claims;
using backend.Models;
using System.Text;
using Microsoft.IdentityModel.Tokens;

using System.IdentityModel.Tokens.Jwt;

public class TokenService : ITokenService
{
    private readonly IConfiguration _config;


    public TokenService(IConfiguration config)
    {
        _config = config;
    }

    public string GenerateToken(User user)
    {
        List<Claim> claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Pseudo)
        };
        string? secretKey = _config["Jwt:Key"]
            ?? throw new InvalidOperationException("La clé JWT est manquante dans appsettings.json");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = creds,
            Issuer = _config["Jwt:Issuer"],
            Audience = _config["Jwt:Audience"]
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}
