import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { SearchresultComponent } from './searchresult/searchresult.component';
import { HeadlinesComponent } from './headlines/headlines.component';
import { NewsbycategoryComponent } from './newsbycategory/newsbycategory.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { NewsComponent } from './news/news.component';
import { TokenInterceptor } from './token.interceptor';
import { AuthorizationInterceptor } from './authorization.interceptor';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material'; 


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        DashboardComponent,
        SearchresultComponent,
        HeadlinesComponent,
        NewsbycategoryComponent,
        NewsComponent,
        FavouritesComponent 
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatExpansionModule,
        MatToolbarModule,
        MatInputModule,
        MatSelectModule,
        MatCardModule,
        MatListModule,
        MatGridListModule,
        MatMenuModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatIconModule,
        MatButtonModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthorizationInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
