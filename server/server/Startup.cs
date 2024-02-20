using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Cors.Infrastructure;
using System.Text;
using Microsoft.EntityFrameworkCore;
using server.InfraStructure;
using Microsoft.AspNetCore.Http;
using server.Data.Repositories;
using server.Service;
using server.Data;

namespace server
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

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            services.AddCors(options => options.AddPolicy("AllowAll",
                                builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));

            services//.AddScoped<IUserRepository, UserRepository>()
               //.AddScoped<IUserService, UserService>()
               .AddScoped<IFavouriteRepository, FavouriteRepository>()
               .AddScoped<IFavouriteService, FavouriteService>()
               .AddTransient<IHttpContextAccessor, HttpContextAccessor>()
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
                    ValidateAudience = false
                };
            });
            services.AddMvc();

            string dbConnectionString = Environment.GetEnvironmentVariable("FavDbConstENV");

            if (string.IsNullOrEmpty(dbConnectionString))
            {
                dbConnectionString = Configuration["ConnectionString"];
            }

            services.AddDbContext<FavouritesDbContext>(options =>
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
            app.UseCors("AllowAll");
            app.UseAuthentication();
            app.UseMvc();

            using (var serviceScope =app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetRequiredService<FavouritesDbContext>();
                context.Database.EnsureCreated();
            }           
        }

        public string GerneateAuthToken(string tokenKey, string userName)
        {
            System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler handler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
            string secret = tokenKey;
            byte[] key = Encoding.ASCII.GetBytes(secret);
            Microsoft.IdentityModel.Tokens.SecurityTokenDescriptor descriptor = new Microsoft.IdentityModel.Tokens.SecurityTokenDescriptor
            {
                SigningCredentials = new Microsoft.IdentityModel.Tokens.SigningCredentials(new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(key), Microsoft.IdentityModel.Tokens.SecurityAlgorithms.HmacSha256),
                Expires = DateTime.UtcNow.AddHours(12),
                Subject = new System.Security.Claims.ClaimsIdentity(new List<System.Security.Claims.Claim>
                    { new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.NameIdentifier, userName) })
            };

            Microsoft.IdentityModel.Tokens.SecurityToken token = handler.CreateToken(descriptor);
            return handler.WriteToken(token);
        }
    }
}
