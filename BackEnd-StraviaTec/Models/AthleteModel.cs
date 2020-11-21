using Newtonsoft.Json.Linq;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEnd_StraviaTec.Models
{
    public class AthleteModel
    {
        NpgsqlConnection connection = new NpgsqlConnection();
        public JProperty getdata(NpgsqlConnection connection, string query, string obj_name)
        {

            connection.Open();

            NpgsqlCommand conector_athlete = new NpgsqlCommand(query, connection);
            NpgsqlDataReader dr = conector_athlete.ExecuteReader();
            dr.Read();

            JProperty athleteProperty = new JProperty(obj_name, dr[0]);

            connection.Close();
            return athleteProperty;
        }

        public string getQueryUsers(JObject users)
        {
            if ((string)users["username1"] == "")
            {
                string query_athlete = "select athlete.f_name, athlete.l_name, athlete.nationality, athlete.username, athlete.prof_img, count(activity_athlete.activity_id) " +
                    "from athlete join activity_athlete " +
                    "on activity_athlete.a_username = athlete.username " +
                    "where athlete.username != '" + (string)users["username2"] + "' " + getFollowing((string)users["username2"]) +
                    "group by athlete.username";
                return query_athlete;
            }
            else
            {
                string query_athlete = "select athlete.f_name, athlete.l_name, athlete.nationality, athlete.username, athlete.prof_img, count(activity_athlete.activity_id) " +
                    "from athlete join activity_athlete " +
                    "on activity_athlete.a_username = athlete.username " +
                    "where athlete.username = '" + (string)users["username1"] + "' and athlete.username != '" + (string)users["username2"] + "' " + getFollowing((string)users["username2"]) +
                    "group by athlete.username";
                return query_athlete;
            }
        }

        public string getFollowing(string username)
        {
            connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
            connection.Open();
            string query = "select a_username2 from athlete, athlete_athlete where a_username1 = '" + username + "' and athlete.username = a_username1; ";
            NpgsqlCommand conector = new NpgsqlCommand(query, connection);
            NpgsqlDataReader dr = conector.ExecuteReader();
            string following = "";
            while (dr.Read())
            {
                following += "and athlete.username != '" + (string)dr[0] + "' ";
            }
            connection.Close();
            return following;
        }

        public string getGroups(string username)
        {
            connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
            connection.Open();
            string query = "select agroup.group_id from agroup, athlete_group where a_username = '" + username + "' and agroup.group_id = athlete_group.group_id;";
            NpgsqlCommand conector = new NpgsqlCommand(query, connection);
            NpgsqlDataReader dr = conector.ExecuteReader();
            string groups = "";
            while (dr.Read())
            {
                groups += "or visibility = '" + dr[0].ToString() + "' ";
            }
            connection.Close();
            return groups;
        }
    }
}