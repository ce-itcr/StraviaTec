using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StraviaTEC.Models.Entities
{
    public class Activity
    {
        public String AthleteName { get; set; }
        public int ActivityCode { get; set; }
        public String ActivityDate { get; set; }
        public int StartTime { get; set; }
        public int EndingTime { get; set; }
        public int Duration { get; set; }
        public String ActivityType { get; set; }
        public int  Mileage { get; set; }
        public String ActivityPath { get; set; }
        public int Completeness { get; set; }

        // references Athlete.FullName
        //public virtual ICollection<Athlete> Athletes { get; set; }

    }
}