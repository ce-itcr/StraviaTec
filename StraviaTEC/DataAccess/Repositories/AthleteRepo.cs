using StraviaTEC.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StraviaTEC.DataAccess.Repositories
{
    public class AthleteRepo
    {
        private DatabaseContext _context;

        public AthleteRepo(DatabaseContext context)
        {
            _context = context;
        }

        public Athlete GetAthlete(string Username)
        {
            return _context.Athlete.FirstOrDefault(athlete => athlete.Username == Username);
        }
    }
}