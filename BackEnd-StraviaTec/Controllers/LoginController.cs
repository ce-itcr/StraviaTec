using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using Npgsql;
using System.Diagnostics;

namespace BackEnd_StraviaTec.Controllers
{
    [EnableCors(origins: "http://localhost:4200/", headers: "*", methods: "*")]
    public class LoginController : ApiController
    {
        NpgsqlConnection connection = new NpgsqlConnection();

        [HttpPost]
        [Route("api/Login")]
        public IHttpActionResult CreateConsumer([FromBody] JObject loginInfo)
        {
            Debug.Print((string)loginInfo["username"]);
            connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
            connection.Open();
            Debug.Print("Conectado");
            string query = "select username, u_password from athlete where username = '" + (string)loginInfo["username"] + "'";
            NpgsqlCommand conector = new NpgsqlCommand(query, connection);
            try
            {
                NpgsqlDataReader dr = conector.ExecuteReader();
                dr.Read();
                if (dr[1].ToString() == (string)loginInfo["password"])
                {
                    connection.Close();
                    return Ok("Success");
                }
                connection.Close();
                return BadRequest("Password is incorrect");
            }
            catch
            {
                connection.Close();
                return BadRequest("No User Found");
            }

        }
    }
}
