import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {

        let token = this.authService.getSecurityToken();
        req = req.clone({
            headers : new HttpHeaders().set(`authorization`, `Bearer ${token}`)
        });
        return next.handle(req);
    }

    constructor(private authService: AuthenticationService){} 

}