using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StraviaTEC.Models.Entities;

namespace StraviaTEC.DataAccess.ModelsConfig
{
    public class AthleteConfig
    {
   
        public static void SetEntityBuilder(EntityTypeBuilder<Athlete> entityBuilder)
        {
            // Table Name
            entityBuilder.ToTable("Athlete");

            // Primary Key
            entityBuilder.Property(a => a.Username);

            // Athlete FirstName 
            entityBuilder.Property(a => a.FirstName)
                         .HasColumnType("varchar(20)")
                         .IsRequired();

            // Athlete LastName 
            entityBuilder.Property(a => a.LastName)
                         .HasColumnType("varchar(20)")
                         .IsRequired();

            // Athlete FullName 
            entityBuilder.Property(a => a.FullName)
                         .HasColumnType("varchar(40)")
                         .IsRequired();

            // Athlete BirthDate 
            entityBuilder.Property(a => a.BithDate)
                         .HasColumnType("varchar(40)")
                         .IsRequired();

            // Athlete CurrentAge 
            entityBuilder.Property(a => a.CurrentAge)
                         .HasColumnType("int")
                         .IsRequired();

            // Athlete Nacionality 
            entityBuilder.Property(a => a.Nacionality)
                         .HasColumnType("varchar(20)")
                         .IsRequired();

            // Athlete Username
            entityBuilder.Property(a => a.Username)
                         .HasColumnType("varchar(20)")
                         .IsRequired();

            // Athlete Password
            entityBuilder.Property(a => a.Passsword)
                         .HasColumnType("varchar(20)")
                         .IsRequired();

        }

    }
}