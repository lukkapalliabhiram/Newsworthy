using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace server.InfraStructure
{
    public class UserResolverService : IUserResolverService
    {
        private readonly IHttpContextAccessor context;
        public UserResolverService(IHttpContextAccessor context)
        {
            this.context = context;
        }

        public ClaimsPrincipal User => context.HttpContext?.User;
    }
    public interface IUserResolverService
    {
        ClaimsPrincipal User { get; }
    }
}
