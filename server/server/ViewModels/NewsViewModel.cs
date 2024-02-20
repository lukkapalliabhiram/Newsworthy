using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.ViewModels
{
    public class NewsViewModel
    {
        public int TotalResults { get; set; }
        public List<ArticleViewModel> Articles { get; set; }
    }
}
