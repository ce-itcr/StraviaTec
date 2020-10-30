using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StraviaTEC.Models.Entities
{
    public class Athlete
    {
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public String FullName { get; set; }
        public String BithDate { get; set; }
        public int CurrentAge { get; set; }
        public String Nacionality { get; set; }
        public String Username { get; set; }
        public String Passsword { get; set; }

    }
}