import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';
import { RoutingService } from './services/routing.service';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CanActivateRouteGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    var token = this.authService.getSecurityToken();
    // var isValidUser = this.authService.isUserAuthenticated(token);
    // if (!isValidUser) {
    //   this.routingService.navigateToLogin();
    // }
    // return isValidUser;
    //console.log(`canActivateRouteGuard token ${token}`);
    return this.authService.isUserAuthenticated(token)
      .pipe(map(response => {
        if (!response['isAuthenticated']) {
          this.routingService.navigateToLogin();
          return false;
        }
        else {
          return true;
        }
      }, error =>{console.log(error);this.routingService.navigateToLogin();return false; }));
    //   return false;
    // this.authService.isUserAuthenticated(token)
    // .pipe(map(response => {if(!response){ this.routingService.navigateToLogin(); }}));
  }

  constructor(private authService: AuthenticationService, private routingService: RoutingService) {

  }

}
