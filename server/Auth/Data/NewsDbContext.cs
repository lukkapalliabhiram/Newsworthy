using Auth.Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore.Extensions;

namespace Auth.Data
{
    public partial class NewsDbContext : DbContext
    {
        public NewsDbContext(DbContextOptions options) : base(options)
        {
             
        }

        public DbSet<User> Users { get; set; } 

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(new User
            {
                Id = 1,
                UserName = "admin",
                Password = "admin",
                DisplayName = "Administrator"
            },
            new User
            {
                Id = 2,
                UserName = "member",
                Password = "member",
                DisplayName = "Member"
            });
        }
    }
}
