import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { news } from '../news';
@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  constructor(private newsService: NewsService) { }
  news: Array<news> = [];
  error: string;

  ngOnInit() {
    this.newsService.getFavourites()
      .subscribe(result => { this.news = result; }, error => this.error = error);
  }

  refreshFavourites(id) {
    console.log(`refreshFavourites id ${id}`);
    this.news = this.news.filter(n => { return n.id !== id; });
  }
}
