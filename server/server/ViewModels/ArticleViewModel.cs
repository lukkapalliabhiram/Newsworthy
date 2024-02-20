using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.ViewModels
{
    public class ArticleViewModel
    {
        public SourceViewModel Source { get; set; }
        public string SourceName { get; set; }
        public string Author { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public string UrlToImage { get; set; }
        public string PublishedAt { get; set; }
        public bool IsFavourite { get; set; }
        public int Id { get; set; }
    }
}
