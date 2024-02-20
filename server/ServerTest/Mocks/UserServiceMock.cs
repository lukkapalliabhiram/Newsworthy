using Entities;
using Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ServerTest.Mocks
{
    public class UserServiceMock : IUserService
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
    }
}
