using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using NewsAPI;
using NewsAPI.Constants;
using NewsAPI.Models;
using server.Entity;
using server.InfraStructure;
using server.Service;
using server.ViewModels;

namespace server.Controllers
{
    [Produces("application/json")]
    [Authorize]
    //[AllowAnonymous]
    public class NewsController : Controller
    {
        private readonly IConfiguration configuration;
        private readonly IFavouriteService favouriteService;
        private readonly IUserResolverService userResolverService;
        private string NewsAPIKey { get; }

        public NewsController(IConfiguration configuration, IFavouriteService favouriteService, IUserResolverService userResolverService)
        {
            this.configuration = configuration;
            this.favouriteService = favouriteService;
            this.userResolverService = userResolverService;
            this.NewsAPIKey = this.configuration["NewsAPIKey"];
        }

        [Route("api/News")]
        public async Task<ArticlesResult> Get()
        {
            NewsApiClient client = new NewsApiClient(this.NewsAPIKey);
            var result = await client.GetEverythingAsync(new NewsAPI.Models.EverythingRequest
            {
                Q = "cup",
                SortBy = SortBys.Popularity,
                Language = Languages.EN,
                From = DateTime.Now.AddDays(-1)//,
                //PageSize = 1
            });
            return result;
        }

        [Route("api/News/Search/{query}")]
        public async Task<IEnumerable<ArticleViewModel>> Search(string query)
        {
            NewsApiClient client = new NewsApiClient(this.NewsAPIKey);
            var result = await client.GetEverythingAsync(new NewsAPI.Models.EverythingRequest
            {
                Q = query,
                SortBy = SortBys.Popularity,
                Language = Languages.EN,
                From = DateTime.Now.AddDays(-1)//,
                //PageSize = 1
            });

            IEnumerable<Favourite> favourites = this.favouriteService.GetFavouritesByUserId(this.GetLoggedInUserName()).ToList();
            IList<ArticleViewModel> viewData = MapToViewModel(result).ToList();

            foreach (ArticleViewModel vd in viewData)
            {
                var filtered = favourites.SingleOrDefault(v => v.Title == vd.Title);

                if (filtered != null)
                {
                    vd.IsFavourite = true;
                    vd.Id = filtered.Id;
                }

            }

            return viewData;
        }

        [Route("api/News/GetByCategory/{category}")]
        public async Task<IEnumerable<ArticleViewModel>> GetByCategory(int category)
        {
            NewsApiClient client = new NewsApiClient(this.NewsAPIKey);

            var result = await client.GetTopHeadlinesAsync(new NewsAPI.Models.TopHeadlinesRequest
            {
                Category = (Categories)category,
                Language = Languages.EN,
                //PageSize = 1,
                Country = Countries.IN
            });
            IEnumerable<Favourite> favourites = this.favouriteService.GetFavouritesByUserId(this.GetLoggedInUserName()).ToList();
            IList<ArticleViewModel> viewData = MapToViewModel(result).ToList();

            foreach (ArticleViewModel vd in viewData)
            {
                var filtered = favourites.SingleOrDefault(v => v.Title == vd.Title);

                if (filtered != null)
                {
                    vd.IsFavourite = true;
                    vd.Id = filtered.Id;
                }

            }

            return viewData;
        }

        [Route("api/News/GetTopHeadlines")]
        public async Task<IEnumerable<ArticleViewModel>> GetTopHeadlines()
        {
            NewsApiClient client = new NewsApiClient(this.NewsAPIKey);

            ArticlesResult result = await client.GetTopHeadlinesAsync(new NewsAPI.Models.TopHeadlinesRequest
            {
                Language = Languages.EN,
                //PageSize = 1,
                Country = Countries.IN
            });

            IEnumerable<Favourite> favourites = this.favouriteService.GetFavouritesByUserId(this.GetLoggedInUserName()).ToList();
            IList<ArticleViewModel> viewData = MapToViewModel(result).ToList();

            foreach (ArticleViewModel vd in viewData)
            {
                var filtered = favourites.SingleOrDefault(v => v.Title == vd.Title);

                if (filtered != null)
                {
                    vd.IsFavourite = true;
                    vd.Id = filtered.Id;
                }

            }

            return viewData;
        }

        [Route("api/news/Getcategories")]
        public IEnumerable<Categories> GetCategories()
        {
            var categories = Enum.GetValues(typeof(Categories))
                .Cast<Categories>().ToList();
            return categories;
        }

        [Route("api/news/favourites")]
        public IActionResult GetFavourites()
        {
            string user = GetLoggedInUserName();
            if (user == null)
            {
                return BadRequest();
            }
            return Ok(this.favouriteService.GetFavouritesByUserId(user));
        }

        [Route("api/news/favourites")]
        [HttpDelete]
        public IActionResult DeleteFavourite(int id)
        {
            this.favouriteService.RemoveFavourite(id);
            return Ok(new { Message="Deleted" });
        }

        [Route("api/news/getfavouriteById/:id")]
        public IActionResult GetFavouriteById(int id)
        {
            return Ok(this.favouriteService.GetFavouriteById(id));
        }


        [Route("api/news/AddToFavourite")]
        public IActionResult AddToFavourites([FromBody]ArticleViewModel favourite)
        {
            if (favourite == null)
            {
                return BadRequest();
            }


            Favourite toAdd = new Favourite
            {
                Author = favourite.Author,
                Description = favourite.Description,
                PublishedAt = Convert.ToDateTime(favourite.PublishedAt),
                SourceName = favourite.SourceName,
                Title = favourite.Title,
                Url = favourite.Url,
                UrlToImage = favourite.UrlToImage,
                UserName = GetLoggedInUserName()
            };
            this.favouriteService.AddToFavourite(toAdd);
            return CreatedAtAction(nameof(GetFavouriteById), new { id = toAdd.Id });
        }

        private string GetLoggedInUserName()
        {
            //    string userName = this.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            //    var loggedinUser = this.userService.GetByUserName(userName);
            //    return loggedinUser;
            string userName = this.userResolverService.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return userName;
        }

        private IEnumerable<ArticleViewModel> MapToViewModel(ArticlesResult result)
        {
            IEnumerable<ArticleViewModel> news = result.Articles.Select(a => new ArticleViewModel
            {
                SourceName = a.Source.Name,
                Author = a.Author,
                Title = a.Title,
                Description = a.Description,
                Url = a.Url,
                UrlToImage = a.UrlToImage,
                PublishedAt = a.PublishedAt.Value.ToString("dd-MMM-yyyy")
            });

            return news;
        }
    }
}
