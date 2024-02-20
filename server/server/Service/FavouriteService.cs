using server.Data.Repositories;
using server.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Service
{
    public class FavouriteService : IFavouriteService
    {
        private readonly IFavouriteRepository favouriteRepository;

        public FavouriteService(IFavouriteRepository favouriteRepository)
        {
            this.favouriteRepository = favouriteRepository;
        }
        public Favourite AddToFavourite(Favourite favourite)
        {
            this.favouriteRepository.Add(favourite);
            this.favouriteRepository.SaveChanges();
            return favourite;
        }

        public Favourite GetFavouriteById(int id)
        {
            return this.favouriteRepository.GetById(id);
        }

        public IEnumerable<Favourite> GetFavouritesByUserId(string userId)
        {
            return this.favouriteRepository.Query(f => f.UserName == userId);
        }

        public void RemoveFavourite(int id)
        {
            Favourite toRemove = this.favouriteRepository.GetById(id);
            this.favouriteRepository.Remove(toRemove);
            this.favouriteRepository.SaveChanges();
        }
    }

    public interface IFavouriteService
    {
        Favourite GetFavouriteById(int id);
        IEnumerable<Favourite> GetFavouritesByUserId(string userId);
        Favourite AddToFavourite(Favourite favourite);
        void RemoveFavourite(int id);
    }
}
