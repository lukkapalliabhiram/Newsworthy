import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RoutingService } from '../services/routing.service';
import { NewsService } from '../services/news.service';
import { AuthenticationService } from '../services/authentication.service';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    categories: Array<string>;
    searchQuery = new FormControl('');
    userName: string = "";

    constructor(private routingService: RoutingService, private newsservice: NewsService, private authService: AuthenticationService) {
    }

    ngOnInit() {
        this.newsservice.getNewsCategories()
            .subscribe(c => { this.categories = c; console.log(`categories ${this.categories}`); });
        this.userName = this.authService.getUsername();
    }

    search() {
        if (!this.searchQuery.value.length) {
            return;
        }
        this.routingService.navigateToSearch(this.searchQuery.value);
    }

    getByCategory(categoryId) {
        this.routingService.navigateToCategories(categoryId);  
    }

    logOff() {
        this.authService.clearSecurityToken();
        this.authService.clearUsername();
        this.routingService.navigateToLogin();
    }

   
}
