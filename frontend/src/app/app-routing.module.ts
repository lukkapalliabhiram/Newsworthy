import { NgModule } from '@angular/core';
import { CanActivate, Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeadlinesComponent } from './headlines/headlines.component';
import { SearchresultComponent } from './searchresult/searchresult.component';
import { NewsbycategoryComponent } from './newsbycategory/newsbycategory.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { CanActivateRouteGuard } from './can-activate-route.guard';
const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path:'register', component:RegisterComponent },
    {
        path: 'dashboard', component: DashboardComponent, canActivate: [CanActivateRouteGuard],
        children: [
            { path: 'view/trending', component: HeadlinesComponent },
            { path: 'view/search/:query', component: SearchresultComponent },
            { path: 'view/bycateogry/:categoryId', component: NewsbycategoryComponent },
            { path: 'view/favourites', component: FavouritesComponent },
            { path: '', redirectTo: 'view/trending', pathMatch: 'full' }
        ]
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
