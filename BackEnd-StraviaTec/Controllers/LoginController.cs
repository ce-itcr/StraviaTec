﻿using BackEnd_StraviaTec.Models;
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
        LoginModel loginModel = new LoginModel();
        NpgsqlConnection connection = new NpgsqlConnection();

        [HttpPost]
        [Route("api/Login")]
        public IHttpActionResult Login([FromBody] JObject loginInfo)
        {

            connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
            connection.Open();

            string query_athlete = "select username, u_password from athlete where username = '" + (string)loginInfo["username"] + "'";
            NpgsqlCommand conector_athlete = new NpgsqlCommand(query_athlete, connection);

            string query_organizer = "select username, u_password from organizer where username = '" + (string)loginInfo["username"] + "'";
            NpgsqlCommand conector_organizer = new NpgsqlCommand(query_organizer, connection);

            if (loginModel.verifyLogin(conector_athlete, (string)loginInfo["password"]))
            {
                connection.Close();
                return Ok("Athlete");
            }
            if (loginModel.verifyLogin(conector_organizer, (string)loginInfo["password"]))
            {
                connection.Close();
                return Ok("Organizer");
            }
            connection.Close();
            return BadRequest("Username or password is incorrect");
        }

        [HttpPost]
        [Route("api/Register")]
        public IHttpActionResult Register([FromBody] JObject registerInfo)
        {
            connection.ConnectionString = "Username = postgres; Password = 123; Host = localhost; Port = 5432; Database = StraviaTec";
            connection.Open();

            string query = "select username from athlete where username = '" + (string)registerInfo["username"] + 
                "' union select username from organizer where username = '" + (string)registerInfo["username"] + "'";
            NpgsqlCommand conector = new NpgsqlCommand(query, connection);
            if (loginModel.existsUser(conector))
            {
                connection.Close();
                connection.Open();
                query = "insert into " + (string)registerInfo["userType"] + " values ('" 
                    + (string)registerInfo["fName"] + "','" + (string)registerInfo["lName"] + "','" 
                    + (string)registerInfo["nationality"] + "','" + (string)registerInfo["bDate"] + "'," 
                    + (string)registerInfo["age"] + ",'" + (string)registerInfo["username"] + "','" + (string)registerInfo["password"] + "');";
                Debug.Print(query);
                NpgsqlCommand execute = new NpgsqlCommand(query, connection);
                execute.ExecuteNonQuery();
                connection.Close();
                return Ok("User created");
            }
            connection.Close();
            return BadRequest("User already exist");
        }
    }
}