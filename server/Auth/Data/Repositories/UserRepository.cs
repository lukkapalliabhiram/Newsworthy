using Auth.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Data.Repositories
{
    public class UserRepository : RepositoryBase<User>, IUserRepository
    {
        private NewsDbContext dbContext;
        public UserRepository(NewsDbContext context) : base(context)
        {

        }
    }
    public interface IUserRepository : IRepositoryBase<User>
    {
    }
}
