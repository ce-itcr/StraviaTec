using BackEnd_StraviaTec.Models;
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
        AthleteModel athleteModel = new AthleteModel();
        General general = new General();
        NpgsqlConnection connection = new NpgsqlConnection();

        [HttpPost]
        [Route("api/athlete/activity")]
        public IHttpActionResult updateActivities([FromBody] JObject athleteActivities)
        {
            Debug.Print("asdfj");
            connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
            connection.Open();
            string query_athlete = "select activity_type, s_time, activity_date, duration, mileage from activity where activity_id in " +
                "(select activity_id from athlete, activity_athlete where '" + (string)athleteActivities["username"] + "' = a_username)";

            NpgsqlCommand conector_athlete = new NpgsqlCommand(query_athlete, connection);
            NpgsqlDataReader dr = conector_athlete.ExecuteReader();
            JObject obj = new JObject();
            int x = 1;
            while (dr.Read())
            {

                JProperty athleteProperty = new JProperty("activity" + x.ToString(), new JObject( 
                new JProperty("activity_type", dr[0]),
                new JProperty("s_time", dr[1]),
                new JProperty("activity_date", dr[2]),
                new JProperty("duration", dr[3]),
                new JProperty("mileage", dr[4])));
                obj.Add(athleteProperty);
                x++;
            }
            JProperty size = new JProperty("size", x);
            obj.Add(size);
            connection.Close();

            query_athlete = "select count(a_username1) from athlete, athlete_athlete where a_username1 = '" + (string)athleteActivities["username"] + "' and athlete.username = a_username1; ";
            obj.Add(athleteModel.getdata(connection,query_athlete, "followers"));

            query_athlete = "select count(a_username2) from athlete, athlete_athlete where a_username2 = '" + (string)athleteActivities["username"] + "' and athlete.username = a_username1; ";
            obj.Add(athleteModel.getdata(connection, query_athlete, "following"));

            string[] names = { "img_url", "fName", "lName", "birthDate", "nationality" };
            connection.Open();
            query_athlete = "select prof_img, f_name, l_name, b_date, nationality from athlete where username = '" + (string)athleteActivities["username"] + "';";
            conector_athlete = new NpgsqlCommand(query_athlete, connection);
            dr = conector_athlete.ExecuteReader();
            dr.Read();
            x = 0;
            foreach(string i in names)
            {
                JProperty athleteProperty = new JProperty(i, dr[x]);
                obj.Add(athleteProperty);
                x++;
            }

            connection.Close();
            return Ok(obj);

        }

        [HttpPost]
        [Route("api/athlete/follows")]
        public IHttpActionResult updateFollows([FromBody] JObject followInfo)
        {
            Debug.Print("asdfj");
            connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
            connection.Open();
            string query_athlete = "select prof_img, f_name, l_name, route, activity_type, s_time, activity_date, duration, mileage " +
                "from activity, athlete " +
                "where activity_id in " +
                "(select activity_id from activity_athlete where username = a_username) " +
                "AND username in " +
                "(select a_username2 from athlete_athlete where a_username1 = '" + (string)followInfo["username"] + "') " +
                "ORDER BY activity_date asc, s_time asc;";

            NpgsqlCommand conector_athlete = new NpgsqlCommand(query_athlete, connection);
            NpgsqlDataReader dr = conector_athlete.ExecuteReader();
            JObject obj = new JObject();
            int x = 1;
            while (dr.Read())
            {
                JProperty athleteProperty = new JProperty("activity" + x.ToString(), new JObject(
                new JProperty("prof_img", dr[0]),
                new JProperty("f_name", dr[1]),
                new JProperty("l_name", dr[2]),
                new JProperty("route", dr[3]),
                new JProperty("activity_type", dr[4]),
                new JProperty("s_time", dr[5]),
                new JProperty("activity_date", dr[6]),
                new JProperty("duration", dr[7]),
                new JProperty("mileage", dr[8])));
                obj.Add(athleteProperty);
                x++;
            }
            JProperty size = new JProperty("size", x);
            obj.Add(size);
            connection.Close();
            return Ok(obj);

        }

        [HttpPost]
        [Route("api/athlete/userinformation")]
        public IHttpActionResult postUserInfo([FromBody] JObject athleteUsername)
        {
            connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
            connection.Open();
            string query_athlete = "select f_name, l_name, nationality, b_date, age, u_password, prof_img from athlete where username = '" + (string)athleteUsername["username"] + "';";

            NpgsqlCommand conector_athlete = new NpgsqlCommand(query_athlete, connection);
            NpgsqlDataReader dr = conector_athlete.ExecuteReader();
            JObject obj = new JObject();

            dr.Read();

            JProperty athleteInfo = new JProperty("athlete", new JObject(
            new JProperty("f_name", dr[0]),
            new JProperty("l_name", dr[1]),
            new JProperty("nationality", dr[2]),
            new JProperty("b_date", dr[3]),
            new JProperty("age", dr[4]), 
            new JProperty("u_password", dr[5]),
            new JProperty("prof_img", dr[6])
            ));

            obj.Add(athleteInfo);
            connection.Close();
            return Ok(obj);
        }

        [HttpPost]
        [Route("api/athlete/update")]
        public IHttpActionResult updateUserInfo([FromBody] JObject athleteInfo)
        {
            connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
            connection.Open();

            string[] ar = { "f_name", "l_name", "nationality", "b_date", "age", "u_password", "prof_img" };

            string query_athlete = "update athlete set ";
            query_athlete = general.checkForNullUpdate(query_athlete, ar, athleteInfo);
            query_athlete += " where username = '" + (string)athleteInfo["username"] + "';";

            NpgsqlCommand conector_athlete = new NpgsqlCommand(query_athlete, connection);
            conector_athlete.ExecuteNonQuery();
            connection.Close();
            return Ok("Ok");
        }

        [HttpPost]
        [Route("api/athlete/createactivity")]
        public IHttpActionResult createActivity([FromBody] JObject athleteActivities)
        {
            Debug.Print("asdfj");
            connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
            connection.Open();
            string query_athlete = "select count(*) from activity";

            NpgsqlCommand conector_athlete = new NpgsqlCommand(query_athlete, connection);
            NpgsqlDataReader dr = conector_athlete.ExecuteReader();

            dr.Read();
            string id = (string)athleteActivities["username"] + (string)athleteActivities["date"] + (string)athleteActivities["s_time"];
            Debug.Print(id);
            dr.Close();
            connection.Close();

            connection.Open();
            string[] ar = { "URL", "s_time", "date", "duration", "a_type", "km" };

            query_athlete = "insert into activity values (" + id + ",";
            query_athlete = general.checkForNullInsert(query_athlete, ar, athleteActivities);
            query_athlete += ",'false','admin');";
            Debug.Print(query_athlete);
            NpgsqlCommand execute = new NpgsqlCommand(query_athlete, connection);
            execute.ExecuteNonQuery();
            connection.Close();

            connection.Open();
            query_athlete = "insert into activity_athlete values ('" + athleteActivities["username"] + "','" + id.ToString() + "');";
            execute = new NpgsqlCommand(query_athlete, connection);
            Debug.Print(query_athlete);
            execute.ExecuteNonQuery();
            connection.Close();

            return Ok("Success");
        }

        [HttpPost]
        [Route("api/athlete/raceandchallenge")]
        public IHttpActionResult updateChallenge([FromBody] JObject athleteActivities)
        {
            connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
            connection.Open();
            string query_athlete = "select race_name, race_date, race_type, visibility " +
                "from race " +
                "where race_id in " +
                "(select race_id " +
                "from athlete_race " +
                "where a_username = '" + (string)athleteActivities["username"] + "')";

            NpgsqlCommand conector_athlete = new NpgsqlCommand(query_athlete, connection);
            NpgsqlDataReader dr = conector_athlete.ExecuteReader();
            JObject obj = new JObject();
            int x = 1;
            while (dr.Read())
            {

                JProperty athleteProperty = new JProperty("race" + x.ToString(), new JObject(
                new JProperty("race_name", dr[0]),
                new JProperty("race_date", dr[1]),
                new JProperty("race_type", dr[2]),
                new JProperty("visibility", dr[3])));
                obj.Add(athleteProperty);
                x++;
            }
            JProperty size = new JProperty("size_race", x);
            obj.Add(size);
            dr.Close();
            connection.Close();

            connection.Open();
            query_athlete = "select cha_name, cha_type, t_period, visibility " +
                "from challenge " +
                "where cha_id in " +
                "(select cha_id " +
                "from athlete_challenge " +
                "where a_username = '" + (string)athleteActivities["username"] + "')";

            conector_athlete = new NpgsqlCommand(query_athlete, connection);
            dr = conector_athlete.ExecuteReader();
            x = 1;
            while (dr.Read())
            {

                JProperty athleteProperty = new JProperty("challenge" + x.ToString(), new JObject(
                new JProperty("cha_name", dr[0]),
                new JProperty("cha_type", dr[1]),
                new JProperty("t_period", dr[2]),
                new JProperty("visibility", dr[3])));
                obj.Add(athleteProperty);
                x++;
            }
            size = new JProperty("size_challenge", x);
            obj.Add(size);
            connection.Close();

            return Ok(obj);
        }
    }
}
