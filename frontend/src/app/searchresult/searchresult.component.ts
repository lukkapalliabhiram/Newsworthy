import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { news } from '../news';
import { NewsService } from '../services/news.service';
@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.css']
})
export class SearchresultComponent implements OnInit {
  searchQuery: string;
  News: Array<news> = [];
  constructor(private activatedRoute: ActivatedRoute, private newsService: NewsService) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(a => { this.searchQuery = a.query; this.searchNews(a.query); })
    this.searchQuery = this.activatedRoute.snapshot.paramMap.get(`query`);

    console.log('init');
  }

  searchNews(searchKey) {
    this.newsService.searchNews(searchKey).subscribe(news => {console.log(news); this.News = news; })

  }
}
