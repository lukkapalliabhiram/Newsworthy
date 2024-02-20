using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Entity
{
    public class Favourite
    {
        public int Id { get; set; }

        //[ForeignKey("UserId")]
        //public User User { get; set; }

        public string SourceName { get; set; }
        public string Author { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public string UrlToImage { get; set; }
        public DateTime? PublishedAt { get; set; }
        public string UserName { get; set; }
        public bool IsFavourite { get; set; }

        public Favourite()
        {
            IsFavourite = true;
        }
    }
}
