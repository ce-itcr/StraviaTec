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
        OrganizerModel organizerModel = new OrganizerModel();
        General general = new General();
        NpgsqlConnection connection = new NpgsqlConnection();

        [HttpPost]
        [Route("api/athlete/activity")]
        public IHttpActionResult obtainActivities([FromBody] JObject athleteActivities)
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
            obj.Add(athleteModel.getdata(connection,query_athlete, "following"));

            query_athlete = "select count(a_username2) from athlete, athlete_athlete where a_username2 = '" + (string)athleteActivities["username"] + "' and athlete.username = a_username1; ";
            obj.Add(athleteModel.getdata(connection, query_athlete, "followers"));

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
        public IHttpActionResult obtainFollows([FromBody] JObject followInfo)
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
            int id = Convert.ToInt32(dr[0]) + 1;
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
                "where confirmation = 'true' and a_username = '" + (string)athleteActivities["username"] + "')";

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

        [HttpPost]
        [Route("api/athlete/race")]
        public IHttpActionResult obtainRace([FromBody] JObject athleteUser)
        {
            connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
            connection.Open();
            string query_athlete = "select race.race_id, race_name, race_type, race_cost, race_date, route, visibility from race where race_id not in(select race_id from athlete_race where a_username = '" + athleteUser["username"] + "');";

            NpgsqlCommand conector_athlete = new NpgsqlCommand(query_athlete, connection);
            NpgsqlDataReader dr = conector_athlete.ExecuteReader();
            JObject obj = new JObject();
            int x = 1;
            while (dr.Read())
            {

                JProperty raceProperty = new JProperty("race" + x.ToString(), new JObject(
                new JProperty("race_id", dr[0]),
                new JProperty("race_name", dr[1]),
                new JProperty("race_type", dr[2]),
                new JProperty("race_cost", dr[3]),
                new JProperty("race_date", dr[4]),
                new JProperty("route", dr[5]),
                new JProperty("visibility", dr[6])));
                obj.Add(raceProperty);
                x++;
            }
            JProperty size = new JProperty("size", x);
            obj.Add(size);
            connection.Close();

            return Ok(obj);
        }

        [HttpPost]
        [Route("api/athlete/challenge")]
        public IHttpActionResult obtainChallenge([FromBody] JObject athleteUser)
        {
            connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
            connection.Open();
            string query_athlete = "select challenge.cha_id, cha_name, cha_type, t_period, visibility from challenge where cha_id not in (select cha_id from athlete_challenge where a_username = '" + athleteUser["username"] + "');";

            NpgsqlCommand conector_athlete = new NpgsqlCommand(query_athlete, connection);
            NpgsqlDataReader dr = conector_athlete.ExecuteReader();
            JObject obj = new JObject();
            int x = 1;
            while (dr.Read())
            {

                JProperty challengeProperty = new JProperty("cha" + x.ToString(), new JObject(
                new JProperty("cha_id", dr[0]),
                new JProperty("cha_name", dr[1]),
                new JProperty("cha_type", dr[2]),
                new JProperty("t_period", dr[3]),
                new JProperty("visibility", dr[4])));
                obj.Add(challengeProperty);
                x++;
            }
            JProperty size = new JProperty("size", x);
            obj.Add(size);

            connection.Close();
            return Ok(obj);
        }

        [HttpPost]
        [Route("api/athlete/groups")]
        public IHttpActionResult obtainGroups([FromBody] JObject athleteUser)
        {
            connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
            connection.Open();
            string query_athlete = "select agroup.group_id, group_name, group_admin from agroup where group_id not in (select group_id from athlete_group where a_username = '" + athleteUser["username"] + "'); ";

            NpgsqlCommand conector_athlete = new NpgsqlCommand(query_athlete, connection);
            NpgsqlDataReader dr = conector_athlete.ExecuteReader();
            JObject obj = new JObject();
            int x = 1;
            while (dr.Read())
            {
                JObject athletesInGroup = organizerModel.obtainAthletesInGroup((string)dr[0]);
                JProperty groupProperty = new JProperty("group" + x.ToString(), new JObject(
                new JProperty("group_id", dr[0]),
                new JProperty("group_name", dr[1]),
                new JProperty("group_admin", dr[2]),
                new JProperty("athletes", athletesInGroup)));
                obj.Add(groupProperty);
                x++;
            }
            JProperty size = new JProperty("size", x);
            obj.Add(size);
            connection.Close();

            return Ok(obj);
        }

        [HttpPost]
        [Route("api/athlete/raceregister")]
        public IHttpActionResult registerToRace([FromBody] JObject athleteInfo)
        {
            if (general.validation("athlete_race", "a_username", "race_id", (string)athleteInfo["username"], (string)athleteInfo["race_id"])) {
                connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
                connection.Open();

                string[] ar = { "username", "race_id", "receipt" };
                string query_athlete = "insert into athlete_race values (";
                query_athlete = general.checkForNullInsert(query_athlete, ar, athleteInfo);
                query_athlete += ",'false');";

                NpgsqlCommand conector_athlete = new NpgsqlCommand(query_athlete, connection);
                conector_athlete.ExecuteNonQuery();
                connection.Close();
                return Ok("Inscrito");
            }
            else
            {
                return BadRequest("La inscripción ya existe");
            }
        }

        [HttpPost]
        [Route("api/athlete/challengeregister")]
        public IHttpActionResult registerToChallenge([FromBody] JObject athleteInfo)
        {
            if (general.validation("athlete_challenge", "a_username", "cha_id", (string)athleteInfo["username"], (string)athleteInfo["cha_id"]))
            {
                connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
                connection.Open();

                string[] ar = { "username", "cha_id" };
                string query_athlete = "insert into athlete_challenge values (";
                query_athlete = general.checkForNullInsert(query_athlete, ar, athleteInfo);
                query_athlete += ");";

                NpgsqlCommand conector_athlete = new NpgsqlCommand(query_athlete, connection);
                conector_athlete.ExecuteNonQuery();
                connection.Close();
                return Ok("Inscrito");
            }
            else
            {
                return BadRequest("La inscripción ya existe");
            }
        }

        [HttpPost]
        [Route("api/athlete/groupregister")]
        public IHttpActionResult registerToGroup([FromBody] JObject athleteInfo)
        {
            if (general.validation("athlete_group", "a_username", "group_id", (string)athleteInfo["username"], (string)athleteInfo["group_id"]))
            {
                connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
                connection.Open();

                string[] ar = { "username", "group_id" };
                string query_athlete = "insert into athlete_group values (";
                query_athlete = general.checkForNullInsert(query_athlete, ar, athleteInfo);
                query_athlete += ");";

                NpgsqlCommand conector_athlete = new NpgsqlCommand(query_athlete, connection);
                conector_athlete.ExecuteNonQuery();
                connection.Close();
                return Ok("Inscrito");
            }
            else
            {
                return BadRequest("La inscripción ya existe");
            }
        }

        [HttpPost]
        [Route("api/athlete/athletesearch")]
        public IHttpActionResult athleteSearch([FromBody] JObject users)
        {
            connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
            connection.Open();
            string query_users = athleteModel.getQueryUsers(users);
            NpgsqlCommand conector_athlete = new NpgsqlCommand(query_users, connection);
            NpgsqlDataReader dr = conector_athlete.ExecuteReader();
            JObject obj = new JObject();
            int x = 1;
            while (dr.Read())
            {
                JProperty usersProperty = new JProperty("user" + x.ToString(), new JObject(
                new JProperty("f_name", dr[0]),
                new JProperty("l_name", dr[1]),
                new JProperty("nationality", dr[2]),
                new JProperty("username", dr[3]),
                new JProperty("prof_img", dr[4]),
                new JProperty("activities", dr[5])
                ));
                obj.Add(usersProperty);
                x++;
            }
            JProperty size = new JProperty("size", x);
            obj.Add(size);
            connection.Close();
            return Ok(obj);
        }

        [HttpPost]
        [Route("api/athlete/addfollow")]
        public IHttpActionResult addFollow([FromBody] JObject followInfo)
        {
            connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
            connection.Open();

            string query_athlete = "insert into athlete_athlete values ('" + followInfo["username"] + "','" + followInfo["athlete_username"] + "');";

            NpgsqlCommand conector_athlete = new NpgsqlCommand(query_athlete, connection);
            conector_athlete.ExecuteNonQuery();
            connection.Close();
            return Ok("Following " + followInfo["athlete_username"]);
        }
    }
}
