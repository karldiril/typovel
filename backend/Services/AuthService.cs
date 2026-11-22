namespace backend.Services;

using backend.DTOs;
using backend.Models;
using backend.Data;
using Microsoft.EntityFrameworkCore;

public class AuthService : IAuthService
{
    private const string DummyHash = "$2a$11$KIX/8fW2a7y7Q6N3z9uL5e1V4x8R2t6Y0w9P3q5M7n1B4c8D2f6G8";

    private readonly TypovelDbContext _context;
    private readonly ITokenService _tokenService;

    public AuthService(TypovelDbContext context, ITokenService tokenService)
    {
        _context = context;
        _tokenService = tokenService;
    }


    public async Task<AuthResponseDto?> RegisterAsync(RegisterDto registerDto)
    {
        if (await AlreadyUsedEmailAsync(registerDto.Email) || await AlreadyUsedPseudoAsync(registerDto.Pseudo))
        {
            return null;
        }

        string passwordHash = HasherPassword(registerDto.Password);
        var newUser = new User

        {
            Pseudo = registerDto.Pseudo.Trim(),
            Email = registerDto.Email.Trim().ToLower(),
            HashPassword = passwordHash,
            CreatedAt = DateTimeOffset.UtcNow
        };       

        _context.Users.Add(newUser);
        await _context.SaveChangesAsync();


        string token = _tokenService.GenerateToken(newUser);

        return new AuthResponseDto
        {
            Token = token,
            User = MapToUserResponse(newUser)
        };
    }

    public async Task<AuthResponseDto?> LoginAsync(LoginDto loginDto)
    {
        User? user = await VerifyUserAsync(loginDto.Email, loginDto.Password);
        if (user == null) return null;

        string token = _tokenService.GenerateToken(user);

        return new AuthResponseDto
        {
            Token = token,
            User = MapToUserResponse(user)
        };
    }

    private async Task<bool> AlreadyUsedEmailAsync(string email)
    {
        string lowerEmail = email.Trim().ToLower();
        bool isAlreadyUsed = await _context.Users.AnyAsync(u => u.Email.ToLower() == lowerEmail);
        return isAlreadyUsed;
    }

    private async Task<bool> AlreadyUsedPseudoAsync(string pseudo)
    {
        string lowerPseudo = pseudo.Trim().ToLower();
        bool isAlreadyUsed = await _context.Users.AnyAsync(u => u.Pseudo.ToLower() == lowerPseudo);
        return isAlreadyUsed;
    }

    private string HasherPassword(string password)
    {
        string passwordHash = BCrypt.Net.BCrypt.HashPassword(password);
        return passwordHash;
    }

    private async Task<User?> VerifyUserAsync(string email, string password)
    {
        string lowerEmail = email.Trim().ToLower();
        User? user = await _context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Email == lowerEmail);

        if (user == null)
        {
            BCrypt.Net.BCrypt.Verify(password, DummyHash);
            return null;
        }
        bool isCorrectPassword = BCrypt.Net.BCrypt.Verify(password, user.HashPassword);

        if (!isCorrectPassword) return null;

        return user;
    }

    private static UserResponseDto MapToUserResponse(User user)
    {
        return new UserResponseDto
        {
            Id = user.Id,
            Pseudo = user.Pseudo,
            Email = user.Email,
            CreatedAt = user.CreatedAt
        };
    }
}


    