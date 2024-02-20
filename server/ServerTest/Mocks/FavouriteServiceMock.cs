using server.Entity;
using server.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ServerTest.Mocks
{
    public class FavouriteServiceMock : IFavouriteService
    {

      
        public FavouriteServiceMock()
        {
           
        }
        public Favourite AddToFavourite(Favourite favourite)
        {
            favourite.Id = 2;
            new TestData().Favourites.Add(favourite);
            return favourite;
        }

        public Favourite GetFavouriteById(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Favourite> GetFavouritesByUserId(string userId)
        {
            return new TestData().Favourites.Where(f => f.UserName == userId);
        }

        public void RemoveFavourite(int id)
        {
            Favourite toRemove = this.GetFavouriteById(id);
            new TestData().Favourites.Remove(toRemove);
        } 
    }
}
