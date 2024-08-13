using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<AppUser> Users { get; set; }
    public DbSet<Driver> Drivers { get; set; }
    public DbSet<Truck> Trucks { get; set; }
    public DbSet<Expense> Expenses { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Driver>()
            .HasOne(e => e.Job)
            .WithMany(e => e.Drivers)
            .HasForeignKey(e => e.JobId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<Driver>()
            .HasOne(e => e.Truck)
            .WithMany(e => e.Drivers)
            .HasForeignKey(e => e.TruckId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<Truck>()
            .HasOne(e => e.Job)
            .WithMany(e => e.Trucks)
            .HasForeignKey(e => e.JobId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<Expense>()
            .HasOne(e => e.Driver)
            .WithMany(e => e.Expenses)
            .HasForeignKey(e => e.DriverId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<Expense>()
            .HasOne(e => e.Truck)
            .WithMany(e => e.Expenses)
            .HasForeignKey(e => e.TruckId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<Expense>()
            .HasOne(e => e.Job)
            .WithMany(e => e.Expenses)
            .HasForeignKey(e => e.JobId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}
