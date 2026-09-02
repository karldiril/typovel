namespace backend.Models;


public class Score
{
    public int Id { get; set; }
    public float Wpm { get; set; }
    public float Accuracy { get; set; }
    public float DurationSeconds { get; set; }
    public int AmountMistakes { get; set; }
    public int  IdUser { get; set; }
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
}