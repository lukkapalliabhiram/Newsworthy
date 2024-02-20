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
import { RegisterComponent } from './register.component';
import { AuthenticationService } from '../services/authentication.service';
import { RoutingService } from '../services/routing.service';
import { Observable, of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

const testConfig = {
  error404: {
    message: 'Http failure response for http://localhost:8089/api/register: 404 Not Found',
    name: 'HttpErrorResponse',
    ok: false,
    status: 404,
    statusText: 'Not Found',
    url: 'http://localhost:8089/api/register'
  },
  error409: {
    error: { message: 'Username already exists' },
    message: 'Username already exists',
    name: 'HttpErrorResponse',
    ok: false,
    status: 409,
    statusText: 'Conflict',
    url: 'http://localhost:8089/api/register'
  },
  positive: {
    token: 'testToken'
  }
};


describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthenticationService;
  let routingService: RoutingService;
  let positiveResponse: any;
  let spyRegisterUser: any;
  let spySetBearerToken: any;
  let spyRouteToDashboard: any;
  let errorMessage: any;
  let debugElement: any;
  let element: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      providers: [AuthenticationService, RoutingService],
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule, HttpClientTestingModule, BrowserAnimationsModule,
        MatFormFieldModule, MatToolbarModule, MatButtonModule, MatExpansionModule,
        MatInputModule, MatSelectModule, MatListModule, MatMenuModule, MatGridListModule, MatCardModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
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

  it('should handle to register a new user  into the system', fakeAsync(() => {
    positiveResponse = testConfig.positive;
    spyRegisterUser = spyOn(authService, 'registerUser').and.returnValue(of(positiveResponse));
    const token = testConfig.positive.token;
    spySetBearerToken = spyOn(authService, 'saveSecurityToken').and.callFake(function () {
      localStorage.setItem('bearerToken', token);
    });
    spyRouteToDashboard = spyOn(routingService, 'navigateToDashboard').and.callFake(function () { });
    const username = new FormControl('stranger');
    component.username = username;
    const password = new FormControl('password');
    component.password = password;
    component.register();
    expect(localStorage.getItem('bearerToken')).toBe(token, 'should get token from local storage');
  }));

  it('should handle duplicate username', fakeAsync(() => {
    errorMessage = testConfig.error409;
    component.submitMessage = ' ';
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.css('.error-message'));
    spyRegisterUser = spyOn(authService, 'registerUser').and.returnValue(throwError(errorMessage));

    const username = new FormControl('stranger');
    component.username = username;
    const password = new FormControl('password');
    component.password = password;
    component.register();

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


  it('should handle 404 error on register', fakeAsync(() => {
    errorMessage = testConfig.error404;
    component.submitMessage = ' ';
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.css('.error-message'));
    spyRegisterUser = spyOn(authService, 'registerUser').and.returnValue(throwError(errorMessage));

    const username = new FormControl('stranger');
    component.username = username;
    const password = new FormControl('password');
    component.password = password;
    component.register();

    tick();
    fixture.detectChanges();
    if (debugElement !== null) {
      element = debugElement.nativeElement;
      expect(element.textContent).toBe(errorMessage.message,
        `should store 'err.message' in a varibale 'submitMessage' to show error on registration page`);
    } else {
      expect(false).toBe(true,
        `should have an element  as <strong *ngIf="submitMessage" class="error-message">{{submitMessage}}</strong>
        in your register.component.html to show server errror response`);
    }
  }));
});
