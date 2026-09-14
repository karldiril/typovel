namespace backend.Services;

using backend.Models;

public interface ITokenService
{
    string GenerateToken(User user);
}