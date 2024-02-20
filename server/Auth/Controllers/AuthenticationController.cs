using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Auth.Entity;
using Auth.InfraStructure;
using Auth.Service;
using Auth.ViewModels; 
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
//using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;  

namespace Auth.Controllers
{
  
    [ApiController]
    [Authorize]
    public class AuthenticationController : Controller
    {
        private readonly IConfiguration configuration;
        private readonly IUserService userService;
        //private readonly IAuthenticationService authService;
        //private readonly ILogger logger;

        public AuthenticationController(IConfiguration configuration, IUserService userService)
        {
            this.configuration = configuration;
            this.userService = userService;
        }

        [Route("api/Authenticate")]
        [HttpPost]
        [AllowAnonymous]
        public IActionResult Authenticate([FromBody]UserViewModel user)
        {
            try
            {
                if (user == null)
                {
                    //this.logger.LogError("UserViewModel is NULL");
                    return BadRequest();
                }
                if (string.IsNullOrEmpty(user.UserName) || string.IsNullOrEmpty(user.Password))
                {
                    return BadRequest();
                }

                User inputUser = userService.GetByUserNameAndPassword(user.UserName, user.Password);
                if (inputUser == null)
                {
                    return Forbid();
                }

                string jwtToken = this.GerneateAuthToken(configuration["Secret"], user.UserName);
                return Json(new { token = jwtToken });
            }
            catch (Exception ex)
            {
                //this.logger.LogError("Authenticate with Username {0} and Password {1} with Error {2}", user.UserName, user.Password, ex.StackTrace + ex.Message);
                throw ex;
            }
           
        }

        [Route("api/Register")]
        [HttpPost]
        [AllowAnonymous]
        public IActionResult Register([FromBody]UserViewModel user)
        {
            try
            {
                if (user == null)
                {
                    //this.logger.LogError("UserViewModel is NULL");
                    return BadRequest();
                }
                if (string.IsNullOrEmpty(user.UserName) || string.IsNullOrEmpty(user.Password))
                {
                    return BadRequest();
                }

                User inputUser = userService.GetByUserName(user.UserName);
                if (inputUser != null)
                {
                    return Conflict();
                }

                User createdUser = userService.AddUser(user.UserName, user.Password);

                string jwtToken = this.GerneateAuthToken(configuration["Secret"], user.UserName);
                return Json(new { token = jwtToken });
            }
            catch (Exception ex)
            {
                //this.logger.LogError("Authenticate with Username {0} and Password {1} with Error {2}", user.UserName, user.Password, ex.StackTrace + ex.Message);
                throw ex;
            }

        }

        [Route("api/IsValidUser")]
        [HttpGet]
        public IActionResult IsValidUser()
        {
            try
            {
                //this.logger.LogInformation("IsValidUser called");
                return Json(new { isAuthenticated = true });


            }
            catch (Exception ex)
            {
                //this.logger.LogError("IsValidUser with  Error {0}",  ex.StackTrace + ex.Message);
                throw ex;
            }
        }

        
        private string GerneateAuthToken(string tokenKey, string userName)
        {
            System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler handler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
            string secret = tokenKey;
            byte[] key = Encoding.ASCII.GetBytes(secret);
            Microsoft.IdentityModel.Tokens.SecurityTokenDescriptor descriptor = new Microsoft.IdentityModel.Tokens.SecurityTokenDescriptor
            {
                SigningCredentials = new Microsoft.IdentityModel.Tokens.SigningCredentials(new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(key), Microsoft.IdentityModel.Tokens.SecurityAlgorithms.HmacSha256),
                Expires = DateTime.UtcNow.AddHours(12),
                Subject = new ClaimsIdentity(new List<Claim> { new Claim(ClaimTypes.NameIdentifier, userName) })
            };

            Microsoft.IdentityModel.Tokens.SecurityToken token = handler.CreateToken(descriptor);
            return handler.WriteToken(token);
        }
    }
}