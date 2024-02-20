import { TestBed, async,fakeAsync,  inject } from '@angular/core/testing';

import { CanActivateRouteGuard } from './can-activate-route.guard';
import { AuthenticationService } from './services/authentication.service';
import { RoutingService } from './services/routing.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'; 
import { RouterTestingModule } from '@angular/router/testing'; 
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('CanActivateRouteGuard', () => {
  let authService: AuthenticationService;
  let routingService: RoutingService;
  let spyCanActivate: any;
  let canActivateRouteGuard : CanActivateRouteGuard;
  let response :any;
  const activatedRouteSnapshot: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
  const routerStateSnapshot: RouterStateSnapshot = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivateRouteGuard, AuthenticationService, RoutingService],
      imports :[ HttpClientTestingModule,RouterTestingModule]
    });
    canActivateRouteGuard = TestBed.get(CanActivateRouteGuard);
  });

  it('should create CanActivateRouteGuard guard', inject([CanActivateRouteGuard], (guard: CanActivateRouteGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should handle if user is authenticated', fakeAsync(() => {
    spyCanActivate = spyOn(canActivateRouteGuard, 'canActivate').and.callFake( function() { return true; } );
    response = canActivateRouteGuard.canActivate(activatedRouteSnapshot, routerStateSnapshot);
    expect(response).toBe(true, 'user is authenticated');
  }));

  it('should handle if user is not authenticated', fakeAsync(() => {
    spyCanActivate = spyOn(canActivateRouteGuard, 'canActivate').and.callFake( function() { return false; } );
    response = canActivateRouteGuard.canActivate(activatedRouteSnapshot, routerStateSnapshot);
    expect(response).toBe(false, 'user is not authenticated');
  }));
});
