using Newtonsoft.Json.Linq;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace BackEnd_StraviaTec.Controllers
{
    [EnableCors(origins: "http://localhost:4200/", headers: "*", methods: "*")]
    public class AthleteController : ApiController
    {
        NpgsqlConnection connection = new NpgsqlConnection();
        [HttpPost]
        [Route("api/athlete/activity")]
        public IHttpActionResult updateActivities([FromBody] JObject loginInfo)
        {
            Debug.Print("asdfj");
            connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
            connection.Open();
            string query_athlete = "select activity_type, s_time, activity_date, duration, mileage from activity where activity_id in " +
                "(select activity_id from athlete, activity_athlete where '" + (string)loginInfo["username"] + "' = a_username)";

            NpgsqlCommand conector_athlete = new NpgsqlCommand(query_athlete, connection);
            NpgsqlDataReader dr = conector_athlete.ExecuteReader();
            JObject obj = new JObject();
            int x = 1;
            while (dr.Read())
            {

                JProperty athleteProperty = new JProperty("athlete" + x.ToString(), new JObject( 
                new JProperty("activity_type", dr[0]),
                new JProperty("s_time", dr[1]),
                new JProperty("activity_date", dr[2]),
                new JProperty("duration", dr[3]),
                new JProperty("mileage", dr[4])));
                obj.Add(athleteProperty);
                x++;
            }
            return Ok(obj);

        }
    }
}
