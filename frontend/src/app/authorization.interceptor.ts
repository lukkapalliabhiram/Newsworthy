import { HttpInterceptor, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { RoutingService } from './services/routing.service';
import {tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
    intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
        return next.handle(req).pipe(tap(
            (event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) { }
            },
            (error: any) => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 401) {
                        this.routeService.navigateToLogin();

                    }
                }
            }
        ))
    }

    constructor(private routeService: RoutingService) { }
}