import { Component, OnInit } from '@angular/core';
import { news } from '../news';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from  '../services/news.service';

@Component({
  selector: 'app-newsbycategory',
  templateUrl: './newsbycategory.component.html',
  styleUrls: ['./newsbycategory.component.css']
})
export class NewsbycategoryComponent implements OnInit {
  categoryId: number;
  News: Array<news> = [];
  constructor(private activatedRoute: ActivatedRoute, private newsService: NewsService) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(a => 
      { this.categoryId = a.categoryId; this.getNewsByCategory(a.categoryId); })
     
  }

  getNewsByCategory(categoryId) {
    this.newsService.getNewsByCategory(categoryId).subscribe(news =>{ this.News = news; })

  }
}
