using Microsoft.EntityFrameworkCore;
using StraviaTEC.Models.Entities;

namespace StraviaTEC.DataAccess
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext() { }
        public DatabaseContext(DbContextOptions<DatabaseContext> opt) : base(opt) { }

        // Database Context Objects
        public DbSet<Athlete> Athlete { get; set; }
        public DbSet<Activity> Activity { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder) {
        

        }

    }
}