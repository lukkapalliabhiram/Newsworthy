using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Moq;
using server.Controllers;
using server.Entity;
using server.InfraStructure;
using server.Service;
using server.ViewModels;
using ServerTest.Mocks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Security.Claims;
using Xunit;

namespace ServerTest
{
    public class NewsControllerTest
    {
        private readonly IConfiguration configuration;
        private readonly IFavouriteService favouriteService;

        public NewsControllerTest()
        {
            this.configuration = new ConfigurationMock();
            this.favouriteService = new FavouriteServiceMock(); 


        }

        [Fact]
        public void GetFavourites_Retunrs_OkResult()
        {
            NewsController controller = CreateController();
            IActionResult result = controller.GetFavourites();
            Assert.IsType<OkObjectResult>(result);
        }


        [Fact]
        public void GetFavourites_Retunrs_FavouritesCollection()
        {
            NewsController controller = CreateController();
            IActionResult result = controller.GetFavourites();
            OkObjectResult oResult = result as OkObjectResult;
            Assert.IsAssignableFrom<IEnumerable<Favourite>>(oResult.Value);
            var favourites = oResult.Value as IEnumerable<Favourite>;
            Assert.True(favourites.Count() == 1);

        }

        [Fact]
        public void AddToFavourites_Returns_CreatedAtResult()
        {
            NewsController controller = CreateController();
            IActionResult result = controller.AddToFavourites(new TestData().GetNewFavourite());
            Assert.IsType<CreatedAtActionResult>(result);
        }

        [Fact]
        public void AddToFavourites_AddItemToFavouritesList()
        {
            NewsController controller = CreateController();
            IActionResult result = controller.AddToFavourites(new TestData().GetNewFavourite());
            CreatedAtActionResult oResult = result as CreatedAtActionResult;
            Assert.True(oResult.Value.HasProperty("id"));
            var favourites = new TestData().Favourites;
            Assert.Equal(2,Convert.ToInt32(oResult.Value.GetPropertyValue("id")));
        }

        [Fact]
        public void AddToFavourites_WithEmptyObject_ReturnsBadRequest()
        {
            NewsController controller = this.CreateController();
            IActionResult result = controller.AddToFavourites(null);
            Assert.IsType<BadRequestResult>(result);
        }

        private NewsController CreateController()
        {
            IList<Claim> claims = new List<Claim> { new Claim(ClaimTypes.NameIdentifier, "admin") };
            ClaimsIdentity identity = new ClaimsIdentity(claims);
            ClaimsPrincipal principal = new ClaimsPrincipal(identity);

            var userResolverService = new Mock<IUserResolverService>();
            userResolverService.Setup(u => u.User).Returns(principal);
            NewsController controller = new NewsController(this.configuration, this.favouriteService, userResolverService.Object);
            return controller;

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
