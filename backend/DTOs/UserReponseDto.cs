namespace backend.DTOs;


public record UserResponseDto
{
    public int Id { get; init; }
    public string Pseudo { get; init; } = string.Empty;
    public string Email { get; init; } = string.Empty;
    public DateTimeOffset CreatedAt { get; init; }
}