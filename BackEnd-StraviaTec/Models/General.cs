using Newtonsoft.Json.Linq;
using Npgsql;
using System;
using System.Collections.Generic;
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

    }
}