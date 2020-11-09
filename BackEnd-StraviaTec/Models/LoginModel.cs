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
                System.Diagnostics.Debug.Print((string)dr[1]);
                dr.Read();
                return false;
            }
            catch
            {
                return true;
            }
        }

    }
}