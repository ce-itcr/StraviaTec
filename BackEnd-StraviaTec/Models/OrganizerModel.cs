using Newtonsoft.Json.Linq;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEnd_StraviaTec.Models
{
    public class OrganizerModel
    {
        NpgsqlConnection connection = new NpgsqlConnection();
        public JObject obtainAthletesInGroup(string id)
        {
            connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
            connection.Open();
            string query = "select a_username from athlete_group where group_id = '" + id + "';" ;

            NpgsqlCommand conector_athlete = new NpgsqlCommand(query, connection);
            NpgsqlDataReader dr = conector_athlete.ExecuteReader();
            JObject obj = new JObject();
            int x = 1;
            while (dr.Read())
            {

                JProperty raceProperty = new JProperty("athlete" + x.ToString(), new JObject(
                new JProperty("username", dr[0])));
                obj.Add(raceProperty);
                x++;
            }
            JProperty size = new JProperty("size", x);
            obj.Add(size);
            connection.Close();
            return obj;
        }

        public JObject obtainBAccountInRace(string id)
        {
            connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
            connection.Open();
            string query = "select bank_account from race_bankaccount where race_id = '" + id + "';";

            NpgsqlCommand conector = new NpgsqlCommand(query, connection);
            NpgsqlDataReader dr = conector.ExecuteReader();
            JObject obj = new JObject();
            int x = 1;
            while (dr.Read())
            {

                JProperty raceProperty = new JProperty("account" + x.ToString(), new JObject(
                new JProperty("bank_account", dr[0])));
                obj.Add(raceProperty);
                x++;
            }
            JProperty size = new JProperty("size", x);
            obj.Add(size);
            connection.Close();
            return obj;
        }

        public JObject obtainCategoryInRace(string id)
        {
            connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
            connection.Open();
            string query = "select cat_name from category_race where race_id = '" + id + "';";

            NpgsqlCommand conector = new NpgsqlCommand(query, connection);
            NpgsqlDataReader dr = conector.ExecuteReader();
            JObject obj = new JObject();
            int x = 1;
            while (dr.Read())
            {

                JProperty raceProperty = new JProperty("category" + x.ToString(), new JObject(
                new JProperty("cat_name", dr[0])));
                obj.Add(raceProperty);
                x++;
            }
            JProperty size = new JProperty("size", x);
            obj.Add(size);
            connection.Close();
            return obj;
        }

        public JObject obtainSponsorInRace(string id)
        {
            connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
            connection.Open();
            string query = "select comp_name from race_sponsor where race_id = '" + id + "';";

            NpgsqlCommand conector = new NpgsqlCommand(query, connection);
            NpgsqlDataReader dr = conector.ExecuteReader();
            JObject obj = new JObject();
            int x = 1;
            while (dr.Read())
            {

                JProperty raceProperty = new JProperty("sponsor" + x.ToString(), new JObject(
                new JProperty("comp_name", dr[0])));
                obj.Add(raceProperty);
                x++;
            }
            JProperty size = new JProperty("size", x);
            obj.Add(size);
            connection.Close();
            return obj;
        }
    }
}