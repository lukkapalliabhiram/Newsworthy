import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { news } from '../news';
import { NewsService } from '../services/news.service';
import { RoutingService } from '../services/routing.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  @Input() News: news;
  @Input() hideFavouriteButton: boolean;
  @Output() favouriteDeleted = new EventEmitter<number>();

  constructor(private newsService: NewsService, private routingService: RoutingService) { }

  ngOnInit() {

  }

  addToFavourite(news) {
    this.newsService.addToFavourite(news).subscribe(
      response => { news.id = response.id; news.isFavourite = true; },
      error => { });
  }

  removeFavourite(id: number) {
    this.newsService.deleteFavourite(id).subscribe(
      response => { this.News.isFavourite = false;   this.favouriteDeleted.emit(id); },
      error => { }
    );
  }
}
