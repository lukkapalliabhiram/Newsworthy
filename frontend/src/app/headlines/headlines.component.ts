import { Component, OnInit } from '@angular/core';
import { NewsService} from '../services/news.service';
import { news } from '../news';

@Component({
  selector: 'app-headlines',
  templateUrl: './headlines.component.html',
  styleUrls: ['./headlines.component.css']
})
export class HeadlinesComponent implements OnInit {
 News: Array<news> = [];
  //error:string;
  constructor(private newsService: NewsService) { }
 
  
  ngOnInit() {
    this.newsService.getTopHeadlines()
    .subscribe(result => { console.log(result);this.News = result; });// , error => this.error = error);
  }

}
