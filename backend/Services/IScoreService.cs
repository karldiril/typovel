namespace backend.Services;

using backend.DTOs;


public interface IScoreService
{
    Task<ScoreResponseDto> AddScoreAsync(ScoreCreateDto scoreCreateDto, int userId);
}