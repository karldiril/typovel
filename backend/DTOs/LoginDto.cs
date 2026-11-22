using System.ComponentModel.DataAnnotations;

namespace backend.DTOs;


public record LoginDto
{
    [Required]
    [MaxLength(255)]
    [EmailAddress]
    public string Email { get; init; } = string.Empty;
    [Required]
    [MinLength(8)]
    [MaxLength(150)]
    public string Password { get; init; } = string.Empty;
}