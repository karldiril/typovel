namespace backend.DTOs;



public record RegisterDto
{
    public string Pseudo { get; init; } = string.Empty;
    public string Email { get; init; } = string.Empty;
    public string Password { get; init; } = string.Empty;
}