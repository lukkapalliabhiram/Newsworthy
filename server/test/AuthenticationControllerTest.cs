using Auth.Controllers;
using Auth.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration; 
using System;
using AuthenticationTest.Mocks;
using Xunit;
using System.Reflection;
using Microsoft.Extensions.Logging;
using Auth.Service;

namespace AuthenticationTest
{
    public class AuthenticationControllerTest
    {
        private readonly AuthenticationController authController;
        private readonly IUserService userService;
        private readonly IConfiguration configuration; 
        //private readonly ILogger<T> logger;

        public AuthenticationControllerTest()
        {
            this.userService = new UserServiceMock();
            this.configuration = new ConfigurationMock(); 
            //logger = new LoggerMock<AuthenticationController>();
            this.authController = new AuthenticationController(configuration, userService);
        }
        [Fact]
        public void Authenticate_WithEmptyObject_Returns_BadRequest()
        {
            IActionResult result = this.authController.Authenticate(null);
            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        public void Authenticate_WithInvalidObject_Returns_BadRequest()
        {
            IActionResult result = this.authController.Authenticate(new UserViewModel { UserName = "", Password = "" });
            Assert.IsType<BadRequestResult>(result);
        }
        [Fact]
        public void Authenticate_WithInvalidCredentials_Returns_NotFound()
        {
            IActionResult result = this.authController.Authenticate(new UserViewModel { UserName = "aa", Password = "aa" });
            Assert.IsType<ForbidResult>(result);
        }


        [Fact]
        public void Authenticate_WithValidCredentials_Returns_Token()
        {
            IActionResult result = this.authController.Authenticate(new UserViewModel { UserName = "admin", Password = "admin" });
            JsonResult jResult = result as JsonResult;
            Assert.IsType<JsonResult>(result);
            Assert.True(jResult.Value.HasProperty("token"));             
        }

        [Fact]
        public void IsValidUser_Returns_JsonResult()
        {
            IActionResult result = this.authController.IsValidUser();
            JsonResult jResult = result as JsonResult;  
            Assert.True(jResult.Value.HasProperty("isAuthenticated"));
            Assert.True(Convert.ToBoolean(jResult.Value.GetPropertyValue("isAuthenticated")));
        }
    }

    public static class Extensions
    {

        public static object GetPropertyValue(this object obj, string propName)
        {
            PropertyInfo propInfo = obj.GetType().GetProperty(propName);
            object propValue = propInfo.GetValue(obj, null);
            return propValue;
        }

        public static bool HasProperty(this object obj, string propName)
        {
            PropertyInfo propInfo = obj.GetType().GetProperty(propName); 
            return propInfo != null;
        }
    }
}
