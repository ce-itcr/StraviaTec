using Newtonsoft.Json.Linq;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEnd_StraviaTec.Models
{
    public class LoginModel
    {
        public bool verifyLogin(NpgsqlCommand conector, String password)
        {
            try
            {
                NpgsqlDataReader dr = conector.ExecuteReader();
                dr.Read();
                if (dr[1].ToString() == password)
                {
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }

        public bool existsUser(NpgsqlCommand conector)
        {
            try
            {
                NpgsqlDataReader dr = conector.ExecuteReader();
                dr.Read();
                System.Diagnostics.Debug.Print("User: " + (string)dr[0] + " ya existe");
                return false;
            }
            catch
            {
                return true;
            }
        }

        public string checkForNull(string query, string[] ar, JObject obj)
        {
            foreach (string i in ar)
            {
                if ((string)obj[i] == null && ar[ar.Length - 1] == i)
                {
                    query += "null";
                }
                else if ((string)obj[i] == null)
                {
                    query += "null,";
                }
                else if (ar[ar.Length - 1] == i)
                {
                    query += "'" + (string)obj[i] + "'";
                }
                else
                {
                    query += "'" + (string)obj[i] + "',";
                }
            }
            return query;
        }

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
            

    }
}