using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using StraviaTEC.DataAccess.Repositories;
using StraviaTEC.Models.DTO;
using System;

namespace StraviaTEC.Controllers
{
 
    [ApiController]
    public class UsersController : ControllerBase
    {

        private readonly AthleteRepo _repository;
        private readonly IMapper _mapper;

        public UsersController(AthleteRepo repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpPost]
        [Route("api/v1/login/athlete")]
        public ActionResult<AthleteReadDTO> AthleteLogin([System.Web.Http.FromBody] UserLoginDTO userDTO)
        {
            var user = _repository.GetAthlete(userDTO.Username);
            if(user == null)
            {
                return new BadRequestObjectResult(new { message = "User Not Found", currentDate = DateTime.Now });
            }
            if(user.Passsword != userDTO.Password)
            {
                return new BadRequestObjectResult(new { message = "User or Password Incorrect", currentDate = DateTime.Now });
            }

            return Ok(_mapper.Map<AthleteReadDTO>(user));
        }

    }
}
