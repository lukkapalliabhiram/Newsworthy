import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NewsService } from './news.service';
import { ApiendpointsService } from './apiendpoints.service';
import { of } from 'rxjs';
import { news } from '../news';

describe('NewsService', () => {
  let service: NewsService;
  let httpController: HttpTestingController;
  let endpoints: ApiendpointsService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  beforeEach(() => {
    service = TestBed.get(NewsService);
    httpController = TestBed.get(HttpTestingController);
    endpoints = TestBed.get(ApiendpointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should request searchNews to correct url`, () => {
    let query = `test`;
    service.searchNews(query).subscribe();
    let req = httpController.expectOne(`${endpoints.apiUrls.searchUrl}${query}`);
    req.flush(of([{}]));
    httpController.verify();
  });
  it(`should request getNewsByCategory to correct url`, () => {
    let categoryId = 1;
    service.getNewsByCategory(categoryId).subscribe();
    let req = httpController.expectOne(`${endpoints.apiUrls.byCategoryUrl}${categoryId}`);
    req.flush(of([{}]));
    httpController.verify();
  });
  it(`should request  getNewsCategories to correct url`, () => {
    service.getNewsCategories().subscribe();
    let req = httpController.expectOne(`${endpoints.apiUrls.categoriesUrl}`);
    req.flush(of([]));
    httpController.verify();
  });
  it(`should request  addToFavourite to correct url`, () => {
    let testNews: news = { url: null, urltoImage: null, isFavourite :false, id :0, publishedAt: new Date('2019-01-01'), source: null, author: null, title: `test title`, description: `test description` };
    service.addToFavourite(testNews).subscribe();
    let req = httpController.expectOne(`${endpoints.apiUrls.addFavouriteUrl}`);
    req.flush(of([]));
    httpController.verify();
  });
  it(`should request  getFavourites to correct url`, () => {
    service.getFavourites().subscribe();
    let req = httpController.expectOne(`${endpoints.apiUrls.favouritesUrl}`);
    req.flush(of([]));
    httpController.verify();

  });
});
