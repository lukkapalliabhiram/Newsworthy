import { async, ComponentFixture, TestBed, fakeAsync  } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { NewsComponent } from './news.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { news } from '../news';
import { NewsService } from '../services/news.service';
import { RouterTestingModule } from '@angular/router/testing'; 
import { RoutingService } from '../services/routing.service';
import { Observable, of, throwError } from 'rxjs';

const newsTest = new news();
newsTest.author = null;
newsTest.description = `Test note description`;
newsTest.publishedAt = null;
newsTest.title = `Test note title`;

const testConfig = {
  error404: {
    message: 'Http failure response for http://localhost:8089/api/authenticate: 404 Not Found',
    name: 'HttpErrorResponse',
    ok: false,
    status: 404,
    statusText: 'Not Found',
    url: 'http://localhost:3000/auth/v1'
  },
  error403: {
    error: { message: 'Unauthorized' },
    message: 'Http failure response for http://localhost:8089/api/authenticate: 403 Forbidden',
    name: 'HttpErrorResponse',
    ok: false,
    status: 403,
    statusText: 'Forbidden',
    url: 'http://localhost:8089/api/authenticate'
  },
  positive: {
    id: 3
  }
};

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;
  let News: news;
  let newsService: NewsService;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewsComponent],
      imports: [MatCardModule, HttpClientTestingModule,RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    component.News = newsTest;
    component.hideFavouriteButton = true;
    newsService = TestBed.get(NewsService);
    routingService = TestBed.get(RoutingService);
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle successfull add to favourites list', () => {
    spyOn(newsService, 'addToFavourite').and.returnValue(of(testConfig.positive));
    spyOn(routingService,'navigateToFavourite').and.callThrough();
    component.addToFavourite(newsTest);
    // expect(routingService.navigateToFavourite).toHaveBeenCalled();

  });
});
