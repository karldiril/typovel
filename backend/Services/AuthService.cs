namespace backend.Services;

using backend.DTOs;
using backend.Models;
using backend.Data;
using Microsoft.EntityFrameworkCore;

public class AuthService : IAuthService
{

    private readonly TypovelDbContext _context;
    private readonly ITokenService _tokenService;

    public AuthService(TypovelDbContext context, ITokenService tokenService)
    {
        _context = context;
        _tokenService = tokenService;
    }


    public async Task<User?> RegisterAsync(RegisterDto registerDto)
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

        return newUser;
    }

    public async Task<string?> LoginAsync(LoginDto loginDto)
    {
        User? user = await VerifyUserAsync(loginDto.Email, loginDto.Password);
        if (user == null) return null;
        else return _tokenService.GenerateToken(user);
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
        User? user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email.Trim().ToLower());
        if (user != null)
        {
            bool isCorrectPassword = BCrypt.Net.BCrypt.Verify(password, user.HashPassword);

            if (isCorrectPassword) return user;
        }
        return null;
    }
}