namespace backend.Data;
using Microsoft.EntityFrameworkCore;
using backend.Models;


public class TypovelDbContext : DbContext
{
    public TypovelDbContext(DbContextOptions<TypovelDbContext> options) : base(options)
    {
    }


    public DbSet<Score> Scores => Set<Score>();
    public DbSet<User> Users => Set<User>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("users");

            entity.HasKey(a => a.Id);

            entity.Property(a => a.Id).HasColumnName("id_user");
            entity.Property(a => a.Pseudo).HasColumnName("pseudo");
            entity.Property(a => a.Email).HasColumnName("email");
            entity.Property(a => a.HashPassword).HasColumnName("hash_password");
            entity.Property(a => a.CreatedAt).HasColumnName("created_at");
        });


        modelBuilder.Entity<Score>(entity =>
        {
            entity.ToTable("score");
            entity.HasKey(a => a.Id);

            entity.Property(a => a.Id).HasColumnName("id_score");
            entity.Property(a => a.Wpm).HasColumnName("wpm");
            entity.Property(a => a.Accuracy).HasColumnName("accuracy");
            entity.Property(a => a.DurationSeconds).HasColumnName("duration_seconds");
            entity.Property(a => a.AmountMistakes).HasColumnName("amount_mistakes");
            entity.Property(a => a.IdUser).HasColumnName("id_user");
            entity.Property(a => a.CreatedAt).HasColumnName("created_at");
        });
    }
}