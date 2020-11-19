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
                    "where athlete.username != '" + (string)users["username2"] + "' " +
                    "group by athlete.username";
                return query_athlete;
            }
            else
            {
                string query_athlete = "select athlete.f_name, athlete.l_name, athlete.nationality, athlete.username, athlete.prof_img, count(activity_athlete.activity_id) " +
                    "from athlete join activity_athlete " +
                    "on activity_athlete.a_username = athlete.username " +
                    "where athlete.username = '" + (string)users["username1"] + "' and athlete.username != '" + (string)users["username2"] + "' " +
                    "group by athlete.username";
                return query_athlete;
            }
        }
    }
}