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
        [Route("api/organizer/races")]
        public IHttpActionResult obtainRace([FromBody] JObject raceInfo)
        {
            connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
            connection.Open();
            string query = "select race_id, race_name, race_type, race_cost, race_date, route, visibility from race where org_username ='" + raceInfo["username"]+"';";

            NpgsqlCommand conector_athlete = new NpgsqlCommand(query, connection);
            NpgsqlDataReader dr = conector_athlete.ExecuteReader();
            JObject obj = new JObject();
            int x = 1;
            while (dr.Read())
            {
                JObject bAccounts = organizerModel.obtainBAccountInRace(dr[0].ToString());
                JObject categories = organizerModel.obtainCategoryInRace(dr[0].ToString());
                JObject sponsors = organizerModel.obtainSponsorInRace(dr[0].ToString());
                JProperty raceProperty = new JProperty("race" + x.ToString(), new JObject(
                new JProperty("race_id", dr[0]),
                new JProperty("race_name", dr[1]),
                new JProperty("race_type", dr[2]),
                new JProperty("race_cost", dr[3]),
                new JProperty("race_date", dr[4]), 
                new JProperty("route", dr[5]),
                new JProperty("visibility", dr[6]),
                new JProperty("bAccounts", bAccounts),
                new JProperty("categories", categories), 
                new JProperty("sponsors", sponsors)));
                obj.Add(raceProperty);
                x++;
            }
            JProperty size = new JProperty("size", x);
            obj.Add(size);
            connection.Close();

            return Ok(obj);
        }


        [HttpPost]
        [Route("api/organizer/createrace")]
        public IHttpActionResult createRace([FromBody] JObject raceInfo)
        {
            connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
            connection.Open();
            string query = "select race_id from race order by race_id desc;";

            NpgsqlCommand conector_athlete = new NpgsqlCommand(query, connection);
            NpgsqlDataReader dr = conector_athlete.ExecuteReader();
            int id;
            try
            {
                dr.Read();
                id = Convert.ToInt32(dr[0]) + 1;
                dr.Close();
                connection.Close();
            }
            catch
            {
                id = 1;
                connection.Close();
            }

            connection.Open();
            string[] ar = { "name", "type", "cost", "date", "route", "visibility" };

            query = "insert into race values (" + id.ToString() + ",";
            query = general.checkForNullInsert(query, ar, raceInfo);
            query += ",'" + (string)raceInfo["username"] + "');";
            Debug.Print(query);
            NpgsqlCommand execute = new NpgsqlCommand(query, connection);
            execute.ExecuteNonQuery();
            connection.Close();

            connection.Open();

            query = "insert into race_bankaccount values ('" + id.ToString() + "', '" + raceInfo["bank_account"] + "');";
            Debug.Print(query);
            execute = new NpgsqlCommand(query, connection);
            execute.ExecuteNonQuery();

            connection.Close();

            connection.Open();

            query = "insert into category_race values ('" + id.ToString() + "', '" + raceInfo["cat_name"] + "');";
            Debug.Print(query);
            execute = new NpgsqlCommand(query, connection);
            execute.ExecuteNonQuery();

            connection.Close();

            connection.Open();

            query = "insert into race_sponsor values ('" + id.ToString() + "', '" + raceInfo["sponsor"] + "');";
            Debug.Print(query);
            execute = new NpgsqlCommand(query, connection);
            execute.ExecuteNonQuery();

            connection.Close();

            return Ok("Success");
        }

        [HttpPost]
        [Route("api/organizer/deleterace")]
        public IHttpActionResult deleteRace([FromBody] JObject raceInfo)
        {
            connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
            string query = "delete from athlete_race where race_id ='" + raceInfo["id"] + "';";

            try
            {
                connection.Open();

                Debug.Print(query);
                NpgsqlCommand execute = new NpgsqlCommand(query, connection);
                execute.ExecuteNonQuery();
                connection.Close();

                query = "delete from race_sponsor where race_id='" + raceInfo["id"] + "';";
                connection.Open();

                Debug.Print(query);
                execute = new NpgsqlCommand(query, connection);
                execute.ExecuteNonQuery();
                connection.Close();

                query = "delete from category_race where race_id='" + raceInfo["id"] + "';";
                connection.Open();

                Debug.Print(query);
                execute = new NpgsqlCommand(query, connection);
                execute.ExecuteNonQuery();
                connection.Close();


                query = "delete from race_bankaccount where race_id='" + raceInfo["id"] + "';";
                connection.Open();

                Debug.Print(query);
                execute = new NpgsqlCommand(query, connection);
                execute.ExecuteNonQuery();
                connection.Close();


                query = "delete from race where race_id='" + raceInfo["id"] + "' and org_username ='" + raceInfo["username"] + "';";
                connection.Open();

                Debug.Print(query);
                execute = new NpgsqlCommand(query, connection);
                execute.ExecuteNonQuery();
                connection.Close();

                return Ok("Success");
            }
            catch
            {
                return BadRequest("Could't delete race");
            }
        }

        [HttpPost]
        [Route("api/organizer/updaterace")]
        public IHttpActionResult updateRace([FromBody] JObject raceInfo)
        {
            connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
            try
            {
                connection.Open();

                string[] ar = { "race_name", "race_type", "race_cost", "race_date", "route", "visibility" };

                string query_athlete = "update race set ";
                query_athlete = general.checkForNullUpdate(query_athlete, ar, raceInfo);
                query_athlete += " where race_id = '" + (string)raceInfo["race_id"] + "';";

                NpgsqlCommand conector_athlete = new NpgsqlCommand(query_athlete, connection);
                conector_athlete.ExecuteNonQuery();
                connection.Close();
                return Ok("Success");
            }
            catch
            {
                return BadRequest("Could't update race");
            }
        }

        [HttpPost]
        [Route("api/organizer/challenges")]
        public IHttpActionResult obtainChallenge([FromBody] JObject challengeInfo)
        {
            connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
            connection.Open();
            string query = "select cha_id, cha_name, cha_type, t_period, visibility, mode, mileage from challenge where org_username ='" + challengeInfo["username"] + "';";

            NpgsqlCommand conector_athlete = new NpgsqlCommand(query, connection);
            NpgsqlDataReader dr = conector_athlete.ExecuteReader();
            JObject obj = new JObject();
            int x = 1;
            while (dr.Read())
            {
                JObject sponsors = organizerModel.obtainSponsorInChallenge(dr[0].ToString());
                JProperty challengeProperty = new JProperty("cha" + x.ToString(), new JObject(
                new JProperty("cha_id", dr[0]),
                new JProperty("cha_name", dr[1]),
                new JProperty("cha_type", dr[2]),
                new JProperty("t_period", dr[3]),
                new JProperty("visibility", dr[4]),
                new JProperty("mode", dr[5]),
                new JProperty("mileage", dr[6]),
                new JProperty("sponsors", sponsors)));
                obj.Add(challengeProperty);
                x++;
            }
            JProperty size = new JProperty("size", x);
            obj.Add(size);
            connection.Close();

            return Ok(obj);
        }

        [HttpPost]
        [Route("api/organizer/createchallenge")]
        public IHttpActionResult createChallenge([FromBody] JObject challengeInfo)
        {
            connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
            connection.Open();
            string query = "select cha_id from challenge order by cha_id desc;";

            NpgsqlCommand conector_athlete = new NpgsqlCommand(query, connection);
            NpgsqlDataReader dr = conector_athlete.ExecuteReader();
            int id;
            try
            {
                dr.Read();
                id = Convert.ToInt32(dr[0]) + 1;
                dr.Close();
                connection.Close();
            }
            catch
            {
                id = 1;
                connection.Close();
            }

            connection.Open();
            string[] ar = { "name", "type", "period", "visibility", "mileage", "mode" };

            query = "insert into challenge values (" + id.ToString() + ",";
            query = general.checkForNullInsert(query, ar, challengeInfo);
            query += ",'" + challengeInfo["username"] + "');";
            Debug.Print(query);
            NpgsqlCommand execute = new NpgsqlCommand(query, connection);
            execute.ExecuteNonQuery();
            connection.Close();

            connection.Open();

            query = "insert into challenge_sponsor values ('" + id.ToString() + "', '" + challengeInfo["sponsor"] + "');";
            Debug.Print(query);
            execute = new NpgsqlCommand(query, connection);
            execute.ExecuteNonQuery();

            connection.Close();

            return Ok("Success");
        }

        [HttpPost]
        [Route("api/organizer/deletechallenge")]
        public IHttpActionResult deleteChallenge([FromBody] JObject challengeInfo)
        {
            connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
            string query = "delete from athlete_challenge where cha_id = '" + challengeInfo["id"] + "';";
            try
            {
                connection.Open();

                Debug.Print(query);
                NpgsqlCommand execute = new NpgsqlCommand(query, connection);
                execute.ExecuteNonQuery();
                connection.Close();

                query = "delete from challenge_sponsor where cha_id='" + challengeInfo["id"] + "';";
                connection.Open();

                Debug.Print(query);
                execute = new NpgsqlCommand(query, connection);
                execute.ExecuteNonQuery();
                connection.Close();

                query = "delete from challenge where cha_id='" + challengeInfo["id"] + "' and org_username ='" + challengeInfo["username"] + "';";
                connection.Open();

                Debug.Print(query);
                execute = new NpgsqlCommand(query, connection);
                execute.ExecuteNonQuery();
                connection.Close();

                return Ok("Success");
            }
            catch
            {
                return BadRequest("Could't delete challenge");
            }

        }

        [HttpPost]
        [Route("api/organizer/updatechallenge")]
        public IHttpActionResult updateChallenge([FromBody] JObject challengeInfo)
        {
            try
            {
                connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
                connection.Open();

                string[] ar = { "cha_name", "cha_type", "t_period", "visibility", "mileage", "mode" };

                string query_athlete = "update challenge set ";
                query_athlete = general.checkForNullUpdate(query_athlete, ar, challengeInfo);
                query_athlete += " where cha_id = '" + (string)challengeInfo["cha_id"] + "';";

                NpgsqlCommand conector_athlete = new NpgsqlCommand(query_athlete, connection);
                conector_athlete.ExecuteNonQuery();
                connection.Close();
                return Ok("Success");
            }
            catch
            {
                return BadRequest("Could't update challenge");
            }
        }

        [HttpPost]
        [Route("api/organizer/groups")]
        public IHttpActionResult obtainGroup([FromBody] JObject groupInfo)
        {
            connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
            connection.Open();
            string query = "select group_id, group_name, group_admin from agroup where org_username ='" + groupInfo["username"] + "';";

            NpgsqlCommand conector_athlete = new NpgsqlCommand(query, connection);
            NpgsqlDataReader dr = conector_athlete.ExecuteReader();
            JObject obj = new JObject();
            int x = 1;
            while (dr.Read())
            {
                JObject athletesInGroup = organizerModel.obtainAthletesInGroup(dr[0].ToString());
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
        [Route("api/organizer/creategroup")]
        public IHttpActionResult createGroup([FromBody] JObject groupInfo)
        {
            connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
            connection.Open();
            string query = "select group_id from agroup order by group_id desc;";

            NpgsqlCommand conector_athlete = new NpgsqlCommand(query, connection);
            NpgsqlDataReader dr = conector_athlete.ExecuteReader();

            int id;
            try
            {
                dr.Read();
                id = Convert.ToInt32(dr[0]) + 1;
                dr.Close();
                connection.Close();
            }
            catch
            {
                id = 1;
                connection.Close();
            }

            connection.Open();
            string[] ar = { "group_name", "group_admin" };

            query = "insert into agroup values (" + id.ToString() + ",";
            query = general.checkForNullInsert(query, ar, groupInfo);
            query += ",'" + groupInfo["username"] + "');";
            Debug.Print(query);
            NpgsqlCommand execute = new NpgsqlCommand(query, connection);
            execute.ExecuteNonQuery();
            connection.Close();

            connection.Open();

            query = "insert into athlete_group values ('" + groupInfo["group_admin"] + "','" + id.ToString() + "');";
            execute = new NpgsqlCommand(query, connection);
            execute.ExecuteNonQuery();
            connection.Close();

            return Ok("Success");
        }

        [HttpPost]
        [Route("api/organizer/deletegroup")]
        public IHttpActionResult deleteGroup([FromBody] JObject groupInfo)
        {
            connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
            string query = "delete from athlete_group where group_id ='" + groupInfo["id"] + "';";
            try
            {
                connection.Open();

                Debug.Print(query);
                NpgsqlCommand execute = new NpgsqlCommand(query, connection);
                execute.ExecuteNonQuery();
                connection.Close();

                query = "delete from agroup where group_id='" + groupInfo["id"] + "' and org_username ='" + groupInfo["username"] + "';";
                connection.Open();

                Debug.Print(query);
                execute = new NpgsqlCommand(query, connection);
                execute.ExecuteNonQuery();
                connection.Close();

                return Ok("Success");
            }
            catch
            {
                return BadRequest("Could't delete challenge");
            }

        }

        [HttpPost]
        [Route("api/organizer/updategroup")]
        public IHttpActionResult updateGroup([FromBody] JObject groupInfo)
        {
            try
            {
                connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
                connection.Open();

                string[] ar = { "group_name", "group_admin" };

                string query_athlete = "update agroup set ";
                query_athlete = general.checkForNullUpdate(query_athlete, ar, groupInfo);
                query_athlete += " where group_id = '" + (string)groupInfo["group_id"] + "';";

                NpgsqlCommand conector_athlete = new NpgsqlCommand(query_athlete, connection);
                conector_athlete.ExecuteNonQuery();
                connection.Close();
                return Ok("Success");
            }
            catch
            {
                return BadRequest("Could't update challenge");
            }
        }

        [HttpPost]
        [Route("api/organizer/raceinscriptions")]
        public IHttpActionResult raceinscriptions([FromBody] JObject orgUser)
        {
            connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
            connection.Open();
            string query = "select race.race_id, race_name, race_date, receipt, a_username from race,athlete_race where confirmation = 'false' and race.race_id = athlete_race.race_id and org_username = '" + orgUser["username"] + "';";

            NpgsqlCommand conector_athlete = new NpgsqlCommand(query, connection);
            NpgsqlDataReader dr = conector_athlete.ExecuteReader();
            JObject obj = new JObject();
            int x = 1;
            while (dr.Read())
            {
                JProperty organizerProperty = new JProperty("register" + x.ToString(), new JObject(
                new JProperty("race_id", dr[0]),
                new JProperty("race_name", dr[1]),
                new JProperty("race_date", dr[2]),
                new JProperty("receipt", dr[3]),
                new JProperty("a_username", dr[4])));
                obj.Add(organizerProperty);
                x++;
            }
            JProperty size = new JProperty("size", x);
            obj.Add(size);
            connection.Close();

            return Ok(obj);
        }

        [HttpPost]
        [Route("api/organizer/update/raceinscription")]
        public IHttpActionResult updateRaceinscriptions([FromBody] JObject Info)
        {
            connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
            connection.Open();
            string query_athlete;
            if ((string)Info["confirmation"] == "TRUE")
            {
                query_athlete = "update athlete_race set confirmation='true' where a_username='" + Info["username"] + "' and race_id='" + Info["id"] + "';";
                NpgsqlCommand conector_athlete = new NpgsqlCommand(query_athlete, connection);
                conector_athlete.ExecuteNonQuery();
                connection.Close();
            }
            else if((string)Info["confirmation"] == "FALSE")
            {
                query_athlete = "delete from athlete_race where a_username='" + Info["username"] + "' and race_id='" + Info["id"] + "';";
                NpgsqlCommand conector_athlete = new NpgsqlCommand(query_athlete, connection);
                conector_athlete.ExecuteNonQuery();
                connection.Close();
            }


            return Ok("Success");
        }

        [HttpPost]
        [Route("api/organizer/generatereports")]
        public IHttpActionResult generateReports()
        {
            Reports.GenerateReports generateReports = new Reports.GenerateReports();
            generateReports.generateParticipantsReport();
            generateReports.generatePositionsReport();
            return Ok();
        }

        [HttpPost]
        [Route("api/organizer/organizerinformation")]
        public IHttpActionResult postUserInfo([FromBody] JObject organizerUsername)
        {
            connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
            connection.Open();
            string query_athlete = "select f_name, l_name, prof_img from organizer where username = '" + (string)organizerUsername["username"] + "';";
            NpgsqlCommand conector_athlete = new NpgsqlCommand(query_athlete, connection);
            NpgsqlDataReader dr = conector_athlete.ExecuteReader();
            JObject obj = new JObject();
            dr.Read();

            JProperty OrganizerInfo = new JProperty("organizer", new JObject(
            new JProperty("f_name", dr[0]),
            new JProperty("l_name", dr[1]),
            new JProperty("prof_img", dr[2])
            ));

            obj.Add(OrganizerInfo);
            connection.Close();
            return Ok(obj);
        }
    }
}
