using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using NewsAPI.Models;
using server.ViewModels;

namespace server.Mappers
{
    public class NewsModelProfile :Profile
    {
        public NewsModelProfile(string profileName) : base(profileName)
        {
            CreateMap<ArticlesResult, NewsViewModel>();
        }

         
    }
}
