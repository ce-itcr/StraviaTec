using Newtonsoft.Json.Linq;
using Npgsql;
using System;
using System.Collections.Generic;
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

            connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
            connection.Open();

            string query = "select activity_type, s_time, activity_date, duration, mileage from athlete where username = '" + (string)loginInfo["username"] + "'";
            NpgsqlCommand conector = new NpgsqlCommand(query, connection);
            return Ok();

        }
    }
}
