using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Npgsql;

namespace BackEnd_StraviaTec.Controllers
{
    public class ValuesController : ApiController
    {
        NpgsqlConnection connection = new NpgsqlConnection();

        // GET api/values
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        public string Get(int id)
        {
            connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = test";
            connection.Open();
            Debug.Print("Conectado");
            string query = "select * from persona where nombre = \"p\"";
            NpgsqlCommand conector = new NpgsqlCommand(query, connection);
            //NpgsqlDataAdapter datos = new NpgsqlDataAdapter(conector);

            NpgsqlDataReader dr = conector.ExecuteReader();

            while (dr.Read())
            {
                Debug.Print("{0}\t{1}\t{2} \n", dr[0], dr[1], dr[2]);
                Debug.Print("Hola");
            }

            connection.Close();
            Debug.Print("Desconectado");
            return "value";
        }

        // POST api/values
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
