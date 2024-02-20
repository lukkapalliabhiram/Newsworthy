using server.Entity;
using server.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace ServerTest.Mocks
{
    public class TestData
    {
        private IList<Favourite> favourites;

        public IList<Favourite> Favourites { get { return this.favourites; } set { favourites = value; } }
        public TestData()
        {
            this.favourites = new List<Favourite>()
            {
                new Favourite{
                    Id =1,
                    SourceName ="Moneycontrol.com",
                    Title ="Market Live: US-China trade talk hopes lift Sensex 700 pts, Nifty above 11K - Moneycontrol.com",
                    Description="All sectoral indices traded in green barring Metals that fell 1.5 percent.",
                    Url="https://www.moneycontrol.com/news/business/markets/market-live-nifty-sensex-tata-steel-psu-bank-lt-metal-4370471.html",
                    UrlToImage="https://static-news.moneycontrol.com/static-mcnews/2019/04/DealingRoom_Sensex_Nifty_Market_Broker-770x433-770x433.jpg",
                    PublishedAt = Convert.ToDateTime("2019-08-26 00:00:00.0000000"),
                    Author=null, UserName ="admin"
                }

            };
        }

        public ArticleViewModel GetNewFavourite()
        {
            ArticleViewModel toAdd = new ArticleViewModel
            {
                SourceName = "TestSource.com",
                Title = "Test Favourite Title",
                Description = "Test Favourite Description.",
                Url = "https://www.testfavourite.com/news/business/markets/market-live-nifty-sensex-tata-steel-psu-bank-lt-metal-4370471.html",
                UrlToImage = "https://static-news.testfavourite.com/static-mcnews/2019/04/DealingRoom_Sensex_Nifty_Market_Broker-770x433-770x433.jpg",
                PublishedAt = "2019-08-2",
                Author = null,
                Source = null
            };
            return toAdd;
        }
    }
}
