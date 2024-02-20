using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Auth.Service;
using Auth.Entity;

namespace AuthenticationTest.Mocks
{
    public class UserServiceMock :IUserService
    {
        private readonly IEnumerable<User> users;

        public UserServiceMock()
        {
            this.users = new List<User>() {new User
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
            }};
        }

        public User GetByUserName(string userName)
        {
            return this.users.FirstOrDefault(u => u.UserName == userName);
        }

        public User GetByUserNameAndPassword(string userName, string password)
        {
            return this.users.FirstOrDefault(u => u.UserName == userName && u.Password == password);
        }

        

        public User GetUserById(int id)
        {
            return this.users.FirstOrDefault(u => u.Id == id);
        }

        public User AddUser(string userName, string password)
        {
            User user = new User { UserName = userName, DisplayName = userName, Password = password };
            this.users.ToList().Add(user);
            return user;
        }
    }
}
