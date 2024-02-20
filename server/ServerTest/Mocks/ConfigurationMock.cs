using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.Text;

namespace ServerTest.Mocks
{
    public class ConfigurationMock : IConfiguration
    {
        //private readonly ICollection<string> keys = new List<string> { "NewsAPIKey", "Secret" };
        private readonly IDictionary<string, string> sections;

        public ConfigurationMock()
        {
            sections = new Dictionary<string, string> { { "NewsAPIKey", "fbdd23e191634fcdbf3d907ba40ca312" } ,
            {"Secret", "this is my custom Secret key for authnetication" } };
        }
        public string this[string key] { get => sections[key]; set => throw new NotImplementedException(); }

        public IEnumerable<IConfigurationSection> GetChildren()
        {
            throw new NotImplementedException();
        }

        public IChangeToken GetReloadToken()
        {
            throw new NotImplementedException();
        }

        public IConfigurationSection GetSection(string key)
        {
            throw new NotImplementedException();
        }
    }
}
