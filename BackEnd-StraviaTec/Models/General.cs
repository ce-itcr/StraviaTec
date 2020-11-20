using Newtonsoft.Json.Linq;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;

namespace BackEnd_StraviaTec.Models
{
    public class General
    {
        NpgsqlConnection connection = new NpgsqlConnection();
        public string checkForNullUpdate(string query, string[] ar, JObject obj)
        {
            foreach (string i in ar)
            {
                if ((string)obj[i] == null && ar[ar.Length - 1] == i)
                {
                    query += i;
                    query += "=null";
                }
                else if ((string)obj[i] == null)
                {
                    query += i;
                    query += "=null,";
                }
                else if (ar[ar.Length - 1] == i)
                {
                    query += i;
                    query += "='" + (string)obj[i] + "'";
                }
                else
                {
                    query += i;
                    query += "='" + (string)obj[i] + "',";
                }
            }
            return query;
        }

        public string checkForNullInsert(string query, string[] ar, JObject obj)
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

        public bool validation(string table, string tableKey1, string tableKey2, string userKey1, string userKey2)
        {
            connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
            connection.Open();
            string query = "select " + tableKey1 + " from " + table + " where " + tableKey1 + " = '" + userKey1 + "' and " + tableKey2 + "= '" + userKey2 + "';";
            Debug.Print(query);
            NpgsqlCommand conector = new NpgsqlCommand(query, connection);
            try
            {
                NpgsqlDataReader dr = conector.ExecuteReader();
                dr.Read();
                Debug.Print("User: " + (string)dr[0] + " ya existe");
                return false;
            }
            catch
            {
                return true;
            }
        }
    }
}