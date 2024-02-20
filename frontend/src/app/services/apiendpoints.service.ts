import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ApiendpointsService {
    private get apiBaseUrl(): string { return 'http://localhost:8081/' };
    private get authBaseUrl(): string { return 'http://localhost:8089/' };

    get apiUrls() {
        return {
            headlinesUrl: `${this.apiBaseUrl}api/news/gettopheadlines`,
            searchUrl: `${this.apiBaseUrl}api/news/search/`,
            byCategoryUrl: `${this.apiBaseUrl}api/news/GetByCategory/`,
            categoriesUrl: `${this.apiBaseUrl}api/news/getcategories`,
            authUrl: `${this.authBaseUrl}api/authenticate`,
            registerUrl:`${this.authBaseUrl}api/register`,
            tokenValidationUrl:`${this.authBaseUrl}api/IsValidUser`,
            addFavouriteUrl:`${this.apiBaseUrl}api/news/AddToFavourite`,
            favouritesUrl:`${this.apiBaseUrl}api/news/favourites` 
        }
    }


    constructor() {
    }
}
 