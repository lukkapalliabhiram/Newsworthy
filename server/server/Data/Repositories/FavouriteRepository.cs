using server.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Data.Repositories
{
    public class FavouriteRepository : RepositoryBase<Favourite>, IFavouriteRepository
    {
        public FavouriteRepository(FavouritesDbContext context) : base(context)
        {

        }
    }

    public interface IFavouriteRepository : IRepositoryBase<Favourite>
    {

    }
}
