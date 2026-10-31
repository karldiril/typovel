namespace backend.Controllers;

using System.Security.Claims;
using backend.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


[ApiController]

[Route("api/[controller]")]

public class ScoreController : ControllerBase
{
    private readonly IScoreService _scoreService;

    public ScoreController(IScoreService scoreService)
    {
        _scoreService = scoreService;
    }

    [Authorize]
    [HttpGet("{id}")]

    public async Task<IActionResult> GetById(int id)
    {
        var score = await _scoreService.GetScoreByIdAsync(id);

        if (score == null)
        {
            return NotFound();
        }

        return Ok(score);
    }


    [HttpPost]
    [Authorize]

    public async Task<IActionResult> CreateScore(ScoreCreateDto scoreCreateDto)
    {
        var claimValue = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (!int.TryParse(claimValue, out int userId))
        {
            return Unauthorized();
        }

        ScoreResponseDto scoreResponseDto =  await _scoreService.AddScoreAsync(scoreCreateDto, userId);

        return CreatedAtAction(
            nameof(GetById),
            new { id = scoreResponseDto.Id },
            scoreResponseDto
        );
    }

}