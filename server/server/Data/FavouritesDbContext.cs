using Microsoft.EntityFrameworkCore;
using server.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Data
{
    public partial class FavouritesDbContext : DbContext
    {
        public FavouritesDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Favourite> Favourites { get; set; }
    }
}
