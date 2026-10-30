namespace backend.DTOs;

using System.ComponentModel.DataAnnotations;


public record CreateScoreDto
{
    [Range(5, 1000)]
    public float Wpm { get; init; }

    [Range(50, 100)]
    public float Accuracy { get; init; }

    [Range(1, 600)]
    public float DurationSeconds { get; init; }

    [Range(0, int.MaxValue)]
    public int AmountMistakes { get; init; }
}