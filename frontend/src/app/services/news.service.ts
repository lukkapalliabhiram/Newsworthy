import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { news } from '../news';
import { ApiendpointsService } from './apiendpoints.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NewsService {
  constructor(private http: HttpClient, private endpoints: ApiendpointsService) {
  }

  getTopHeadlines(): Observable<Array<news>> {
    return this.http.get<news[]>(this.endpoints.apiUrls.headlinesUrl);
  }
  searchNews(query): Observable<Array<news>> {
    return this.http.get<news[]>(this.endpoints.apiUrls.searchUrl + query);
  }
  getNewsByCategory(categoryId: number): Observable<Array<news>> {
    return this.http.get<news[]>(this.endpoints.apiUrls.byCategoryUrl + categoryId);
  }

  getNewsCategories(): Observable<Array<string>> {
    return this.http.get<Array<string>>(this.endpoints.apiUrls.categoriesUrl);
  }
  addToFavourite(favourite: news): Observable<news> {
    return this.http.post<news>(this.endpoints.apiUrls.addFavouriteUrl, favourite);
  }
  getFavourites(): Observable<news[]> {
    return this.http.get<news[]>(this.endpoints.apiUrls.favouritesUrl);
  }

  deleteFavourite(id: number): Observable<string> {
    return this.http.delete<string>(`${this.endpoints.apiUrls.favouritesUrl}?id=${+id}`);
  }

  // setLocalFavourites(favourites: news[]): void {
  //   let favouriteTitles = favourites.map(f => f.title);
  //   localStorage.setItem(`favourites`, JSON.stringify(favouriteTitles));
  // }

  // getLocalFavourites(): string[] {
  //   let favs = localStorage.getItem(`favourites`);
  //   if (favs) {
  //     return JSON.parse(favs);
  //   }
  //   return [];
  // }

}


