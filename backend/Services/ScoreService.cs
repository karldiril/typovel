namespace backend.Services;

using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.EntityFrameworkCore;

public class ScoreService : IScoreService
{
    private readonly TypovelDbContext _context;

    public ScoreService(TypovelDbContext context)
    {
        _context = context;
    }


    public async Task<ScoreResponseDto?> GetScoreByIdAsync(int id)
    {
        var score = await _context.Scores.AsNoTracking().FirstOrDefaultAsync(s => s.Id == id);

        if (score == null)
        {
            return null;
        }

        return new ScoreResponseDto
        {
            Id = score.Id,
            Wpm = score.Wpm,
            Accuracy = score.Accuracy,
            DurationSeconds = score.DurationSeconds,
            AmountMistakes = score.AmountMistakes,
            CreatedAt = score.CreatedAt
        };
    }



    public async Task<ScoreResponseDto> AddScoreAsync(ScoreCreateDto scoreCreateDto, int userId)
    {

        DateTimeOffset createdAt = DateTimeOffset.UtcNow;

        var newScore = new Score
        {
            Wpm = scoreCreateDto.Wpm,
            Accuracy = scoreCreateDto.Accuracy,
            DurationSeconds = scoreCreateDto.DurationSeconds,
            AmountMistakes = scoreCreateDto.AmountMistakes,
            IdUser = userId,
            CreatedAt = createdAt
        };

        _context.Scores.Add(newScore);
        await _context.SaveChangesAsync();


        var scoreResponse = new ScoreResponseDto
        {
            Id = newScore.Id,
            Wpm = newScore.Wpm,
            Accuracy = newScore.Accuracy,
            DurationSeconds = newScore.DurationSeconds,
            AmountMistakes = newScore.AmountMistakes,
            CreatedAt = newScore.CreatedAt
        };


        return scoreResponse;
    }
}