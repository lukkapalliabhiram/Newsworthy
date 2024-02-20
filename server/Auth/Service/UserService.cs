using Auth.Data.Repositories;
using Auth.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Service
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;
        public UserService(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }
        public User GetUserById(int id)
        {
            return this.userRepository.GetById(id);
        }
        public User GetByUserNameAndPassword(string userName, string password)
        {
            var user = this.userRepository.Query(u => u.UserName == userName && u.Password == password).FirstOrDefault();
            return user;
        }
        public User GetByUserName(string userName)
        {
            User user = this.userRepository.Query(u => u.UserName == userName).FirstOrDefault();
            return user;
        }

        public User AddUser(string userName, string password)
        {
            User user = this.userRepository.Add(new User { DisplayName = userName, UserName = userName, Password = password });
            this.userRepository.SaveChanges();
            return user;
        }
    }

    public interface IUserService
    {
        User GetUserById(int id);
        User GetByUserNameAndPassword(string userName, string password);
        User GetByUserName(string userName);
        User AddUser(string userName, string password);
    }
}
