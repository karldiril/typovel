namespace backend.DTOs;


public record ScoreResponseDto
{
    public int Id { get; init; }

    public float Wpm { get; init; }

    public float Accuracy { get; init; }

    public float DurationSeconds { get; init; }

    public int AmountMistakes { get; init; }

    public DateTimeOffset CreatedAt { get; init; }
}