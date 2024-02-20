using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.ViewModels;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Configuration;
using System.Text;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace server.Controllers
{
    [Produces("application/json")]
    [Authorize]
    public class UserController : Controller
    {
        private readonly IConfiguration configuration;
        public UserController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        private ICollection<UserViewModel> Users
        {
            get
            {
                return new List<UserViewModel>  { new UserViewModel
                {
                                                                        ID = 1,
                                                                        Email = "abc@y.com",
                                                                        UserName = "admin",
                                                                        Password = "admin",
                                                                        Name = "Administrator"
                }
            };
            }
        }

        [Route("api/User")]
        public ICollection<UserViewModel> GetUsers()
        {
            return this.Users;
        }

        [Route("api/Authenticate")]
        [HttpPost]
        [AllowAnonymous]
        public IActionResult Authenticate([FromBody]UserViewModel user)
        {
            if (this.Users.FirstOrDefault(u => u.UserName == user.UserName && u.Password == user.Password) == null)
            {
                return null;
            }
            JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
            string secret = configuration["Secret"];
            byte[] key = Encoding.ASCII.GetBytes(secret);
            SecurityTokenDescriptor descriptor = new SecurityTokenDescriptor
            {
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256),
                Expires = DateTime.UtcNow.AddHours(12),
                Subject = new ClaimsIdentity(new List<Claim> { new Claim(ClaimTypes.NameIdentifier, user.UserName) })
            };
          
            SecurityToken token = handler.CreateToken(descriptor);
            return Json(new { token = handler.WriteToken(token) });
        }

        [Route("api/IsValidUser")]
        [HttpGet] 
        public IActionResult IsValidUser()
        {
            return Json(new{ isAuthenticated=true});
        }
        [Route("api/IsValidUser")]
        [HttpPost]
        public IActionResult IsValidUser([FromBody]string token)
        {
            try
            {
                if (string.IsNullOrEmpty(token))
                {
                    return BadRequest();
                }
                JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
                string secret = configuration["Secret"];
                byte[] key = Encoding.ASCII.GetBytes(secret);
                SecurityToken outToken = null;
                ClaimsPrincipal principal = handler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                }, out outToken);

                return Json(new { isAuthenticated = principal.Identity.IsAuthenticated });
            }
            catch (Exception)
            {
                return BadRequest(); 
            } 
        }
    }
}