import { Injectable } from '@angular/core';
import { Router, Route} from '@angular/router';
@Injectable({
    providedIn: 'root'
})

export class RoutingService{

    /**
     *
     */
    constructor(private router:Router) {
        

    }
    navigateToSearch(searchKey){
        this.router.navigate([`dashboard/view/search/${searchKey}`]);
    }
    navigateToCategories(categoryId){
        this.router.navigate([`dashboard/view/bycateogry/${categoryId}`]);
    }
    navigateToLogin(){
        this.router.navigate(['login']);
    }
    navigateToDashboard(){
        this.router.navigate(['dashboard']);
    }
    navigateToFavourite(){
        this.router.navigate([`dashboard/view/favourites`]);
    }

    reload(){
       var currentUrl = this.getCurrentUrl();
       this.navigateToRoute(currentUrl);
    }

    navigateToRoute(navigateUrl: string): void{
        this.router.navigate([`${navigateUrl}`]);
    }

    getCurrentUrl():string{
        console.log(this.router.url);
         return this.router.url;
    }
}