import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login.component';
import { AuthenticationService } from '../services/authentication.service';
import { RoutingService } from '../services/routing.service';
import { Observable, of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

const testConfig = {
  error404: {
    message: 'Http failure response for http://localhost:8089/api/authenticate: 404 Not Found',
    name: 'HttpErrorResponse',
    ok: false,
    status: 404,
    statusText: 'Not Found',
    url: 'http://localhost:8089/api/authenticate'
  },
  error403: {
    error: { message: 'Unauthorized' },
    message: 'Http failure response for http://localhost:8089/api/authenticate: 403 Forbidden',
    name: 'HttpErrorResponse',
    ok: false,
    status: 403,
    statusText: 'Forbidden',
    url: 'http://localhost:8089/api/authenticate'
  },
  positive: {
    token: 'testToken'
  }
};


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthenticationService;
  let routingService: RoutingService;
  let positiveResponse: any;
  let spyAuthenticateUser: any;
  let spySetBearerToken: any;
  let spyRouteToDashboard: any;
  let errorMessage: any;
  let debugElement: any;
  let element: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [AuthenticationService, RoutingService],
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule, HttpClientTestingModule, BrowserAnimationsModule,
        MatFormFieldModule, MatToolbarModule, MatButtonModule, MatExpansionModule,
        MatInputModule, MatSelectModule, MatListModule, MatMenuModule, MatGridListModule, MatCardModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = fixture.debugElement.injector.get(AuthenticationService);
    routingService = fixture.debugElement.injector.get(RoutingService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(authService).toBeTruthy();
    expect(routingService).toBeTruthy();
  });

  it('should handle to login into the system', fakeAsync(() => {
    positiveResponse = testConfig.positive;
    spyAuthenticateUser = spyOn(authService, 'loginUser').and.returnValue(of(positiveResponse));
    const token = testConfig.positive.token;
    spySetBearerToken = spyOn(authService, 'saveSecurityToken').and.callFake(function () {
      localStorage.setItem('bearerToken', token);
    });
    spyRouteToDashboard = spyOn(routingService, 'navigateToDashboard').and.callFake(function () { });
    const username = new FormControl('stranger');
    component.username = username;
    const password = new FormControl('password');
    component.password = password;
    component.loginSubmit();
    expect(localStorage.getItem('bearerToken')).toBe(token, 'should get token from local storage');
  }));

  it('should handle incorrect login and password', fakeAsync(() => {
    errorMessage = testConfig.error403;
    component.submitMessage = ' ';
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.css('.error-message'));
    spyAuthenticateUser = spyOn(authService, 'loginUser').and.returnValue(throwError(errorMessage));

    const username = new FormControl('stranger');
    component.username = username;
    const password = new FormControl('password');
    component.password = password;
    component.loginSubmit();

    tick();
    fixture.detectChanges();
    if (debugElement !== null) {
      element = debugElement.nativeElement;
      expect(element.textContent).toBe(errorMessage.error.message,
        `should store 'err.error.message' in a varibale 'submitMessage' to show error on login page`);
    } else {
      expect(false).toBe(true,
        `should have an element  as <strong *ngIf="submitMessage" class="error-message">{{submitMessage}}</strong>
        in your login.component.html to show server errror response`);
    }
  }));


  it('should handle 404 error on login', fakeAsync(() => {
    errorMessage = testConfig.error404;
    component.submitMessage = ' ';
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.css('.error-message'));
    spyAuthenticateUser = spyOn(authService, 'loginUser').and.returnValue(throwError(errorMessage));

    const username = new FormControl('stranger');
    component.username = username;
    const password = new FormControl('password');
    component.password = password;
    component.loginSubmit();

    tick();
    fixture.detectChanges();
    if (debugElement !== null) {
      element = debugElement.nativeElement;
      expect(element.textContent).toBe(errorMessage.message,
        `should store 'err.message' in a varibale 'submitMessage' to show error on login page`);
    } else {
      expect(false).toBe(true,
        `should have an element  as <strong *ngIf="submitMessage" class="error-message">{{submitMessage}}</strong>
        in your login.component.html to show server errror response`);
    }
  }));
});
