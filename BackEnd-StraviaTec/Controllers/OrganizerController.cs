using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BackEnd_StraviaTec.Models;
using Newtonsoft.Json.Linq;
using Npgsql;
using System.Web.Http.Cors;
using System.Diagnostics;

namespace BackEnd_StraviaTec.Controllers
{
    [EnableCors(origins: "http://localhost:4200/", headers: "*", methods: "*")]
    public class OrganizerController : ApiController
    {
        NpgsqlConnection connection = new NpgsqlConnection();
        General general = new General();
        OrganizerModel organizerModel = new OrganizerModel();

        [HttpPost]
        [Route("api/organizer/createrace")]
        public IHttpActionResult createRace([FromBody] JObject raceInfo)
        {
            connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
            connection.Open();
            string query = "select count(*) from race";

            NpgsqlCommand conector_athlete = new NpgsqlCommand(query, connection);
            NpgsqlDataReader dr = conector_athlete.ExecuteReader();

            dr.Read();
            int id = Convert.ToInt32(dr[0]) + 1;
            dr.Close();
            connection.Close();

            connection.Open();
            string[] ar = { "name", "type", "cost", "date", "route", "visibility" };

            query = "insert into race values (" + id.ToString() + ",";
            query = general.checkForNullInsert(query, ar, raceInfo);
            query += ",'" + (string)raceInfo["username"] + "');";
            Debug.Print(query);
            NpgsqlCommand execute = new NpgsqlCommand(query, connection);
            execute.ExecuteNonQuery();
            connection.Close();

            return Ok("Success");
        }

        [HttpPost]
        [Route("api/organizer/deleterace")]
        public IHttpActionResult deleteRace([FromBody] JObject raceInfo)
        {
            connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
            string query = "delete from race where race_id='" + raceInfo["id"] + "';";

            connection.Open();

            Debug.Print(query);
            NpgsqlCommand execute = new NpgsqlCommand(query, connection);
            execute.ExecuteNonQuery();
            connection.Close();

            return Ok("Success");
        }

        [HttpPost]
        [Route("api/organizer/createchallenge")]
        public IHttpActionResult createChallenge([FromBody] JObject challengeInfo)
        {
            connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
            connection.Open();
            string query = "select count(*) from challenge";

            NpgsqlCommand conector_athlete = new NpgsqlCommand(query, connection);
            NpgsqlDataReader dr = conector_athlete.ExecuteReader();

            dr.Read();
            int id = Convert.ToInt32(dr[0]) + 1;
            dr.Close();
            connection.Close();

            connection.Open();
            string[] ar = { "name", "type", "period", "visibility" };

            query = "insert into challenge values (" + id.ToString() + ",";
            query = general.checkForNullInsert(query, ar, challengeInfo);
            query += ",'" + challengeInfo["username"] + "');";
            Debug.Print(query);
            NpgsqlCommand execute = new NpgsqlCommand(query, connection);
            execute.ExecuteNonQuery();
            connection.Close();

            return Ok("Success");
        }

        [HttpPost]
        [Route("api/organizer/deletechallenge")]
        public IHttpActionResult deleteChallenge([FromBody] JObject challengeInfo)
        {
            connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
            string query = "delete from challenge where cha_id='" + challengeInfo["id"] + "';";

            connection.Open();

            Debug.Print(query);
            NpgsqlCommand execute = new NpgsqlCommand(query, connection);
            execute.ExecuteNonQuery();
            connection.Close();

            return Ok("Success");
        }
    }
}
