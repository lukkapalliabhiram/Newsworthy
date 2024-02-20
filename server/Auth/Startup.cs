using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Auth.Data;
using Auth.Data.Repositories;
using Auth.InfraStructure;
using Auth.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
//using Serilog.Extensions.Logging;
namespace Auth
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            string secret = Configuration["Secret"];
            byte[] key = Encoding.ASCII.GetBytes(secret);

            services.AddCors(options => options.AddPolicy("AllowAll",
                                builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));

            services.AddScoped<IUserRepository, UserRepository>()
                .AddScoped<IUserService, UserService>()
                //.AddScoped<IFavouriteRepository,FavouriteRepository>()
                //.AddScoped<IFavouriteService,FavouriteService>()
                //.AddScoped<IAuthenticationService, AuthenticationService>()
                .AddTransient<IUserResolverService, UserResolverService>();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false//,NameClaimType = System.Security.Claims.ClaimTypes.NameIdentifier
                };
            });
            services.AddMvc();
            string dbConnectionString  = Environment.GetEnvironmentVariable("AuthDbConstENV");

            if (string.IsNullOrEmpty(dbConnectionString))
            {
                dbConnectionString = Configuration["ConnectionString"];
            }
            services.AddDbContext<NewsDbContext>(options =>
            {
                options.UseSqlServer(dbConnectionString);

            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            } 
            //loggerFactory.AddFile("AuthLog-{Date}.txt");
            app.UseCors("AllowAll");
            app.UseAuthentication();
            app.UseMvc();

            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetRequiredService<NewsDbContext>();
                context.Database.EnsureCreated();
            }
        }
    }
}
