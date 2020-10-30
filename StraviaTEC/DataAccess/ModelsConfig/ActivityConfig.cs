using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StraviaTEC.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StraviaTEC.DataAccess.ModelsConfig
{
    public class ActivityConfig
    {

        public static void SetEntityBuilder(EntityTypeBuilder<Activity> entityBuilder)
        {
            // Table Name
            entityBuilder.ToTable("AthleteActivity");

            // Primary Key
            entityBuilder.Property(a => a.ActivityCode);

            // Foreign Key
            entityBuilder.Property(a => a.AthleteName)
                         .HasColumnType("varchar(20)")
                         .IsRequired();

            // Activity Code
            entityBuilder.Property(a => a.ActivityCode)
                         .HasColumnType("int")
                         .IsRequired();

            // Activity Date
            entityBuilder.Property(a => a.ActivityDate)
                         .HasColumnType("varchar(20)")
                         .IsRequired();

            // Activity Start Time
            entityBuilder.Property(a => a.StartTime)
                         .HasColumnType("int")
                         .IsRequired();

            // Activity Ending Time
            entityBuilder.Property(a => a.EndingTime)
                         .HasColumnType("int")
                         .IsRequired();

            // Activity Duration
            entityBuilder.Property(a => a.Duration)
                         .HasColumnType("int")
                         .IsRequired();

            // Activity Type
            entityBuilder.Property(a => a.ActivityType)
                         .HasColumnType("varchar(20)")
                         .IsRequired();

            // Activity Mileage
            entityBuilder.Property(a => a.Mileage)
                         .HasColumnType("int")
                         .IsRequired();

            // Activity Path
            entityBuilder.Property(a => a.ActivityPath)
                         .HasColumnType("varchar(100)")
                         .IsRequired();

            // Activity Completeness
            entityBuilder.Property(a => a.ActivityDate)
                         .HasColumnType("int")
                         .IsRequired();

    


        }

    }
}