using System.ComponentModel.DataAnnotations;

namespace backend.DTOs;



public record RegisterDto
{

    [Required]
    public string Pseudo { get; init; } = string.Empty;
    [Required]
    [MaxLength(255)]
    [EmailAddress]
    public string Email { get; init; } = string.Empty;
    [Required]
    [MaxLength(150)]
    public string Password { get; init; } = string.Empty;
}