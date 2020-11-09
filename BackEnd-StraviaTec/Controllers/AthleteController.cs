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
            JArray array = new JArray();
            while (dr.Read())
            {
                JArray athleteArray = new JArray();
                athleteArray.Add(new JValue("activity_type: " + dr[0]));
                athleteArray.Add(new JValue("s_time: " + dr[1]));
                athleteArray.Add(new JValue("activity_date: " + dr[2]));
                athleteArray.Add(new JValue("duration: " + dr[3]));
                athleteArray.Add(new JValue("mileage: " + dr[4]));
                array.Add(athleteArray);
            }
            return Ok(array);

        }
    }
}
