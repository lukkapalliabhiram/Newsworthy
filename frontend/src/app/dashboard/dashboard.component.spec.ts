import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
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
import { RoutingService } from '../services/routing.service';
import { AuthenticationService } from '../services/authentication.service';
import { NewsService } from '../services/news.service';
import { of } from 'rxjs';
import { tick } from '@angular/core/src/render3';
import { MatIconModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let routingService: RoutingService;
  let authService: AuthenticationService;
  let newsService;//: NewsService;
  // let fakeNewsService = jasmine.createSpyObj(`NewsService`,[`getNewsCategories`]);
  // let fakeAuthService = jasmine.createSpyObj(`AuthenticationService`,[`clearSecurityToken`]);
  // let fakeRoutingService = jasmine.createSpyObj(`RoutingService`,[`navigateToSearch`, `navigateToCategories`, `navigateToLogin`]);
  const newsCategories = [`Sports`, `Politics`, `Science`];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule, BrowserAnimationsModule,FormsModule,
        MatFormFieldModule, MatToolbarModule, MatButtonModule, MatExpansionModule,MatSidenavModule,FlexLayoutModule,
        MatInputModule, MatSelectModule, MatListModule, MatMenuModule, MatGridListModule, MatCardModule,MatIconModule],
      providers: [AuthenticationService, RoutingService, NewsService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    routingService = TestBed.get(RoutingService);
    authService = TestBed.get(AuthenticationService);
    newsService = TestBed.get(NewsService);
    spyOn(newsService, "getNewsCategories").and.returnValue(of(newsCategories));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should load categries on init', () => {
    expect(newsService.getNewsCategories).toHaveBeenCalled();
    expect(component.categories).toEqual(newsCategories);
  });

  it('Should clear the token on logoff', () => {
    component.logOff();
    //expect(authService.clearSecurityToken).toHaveBeenCalled();
    expect(authService.getSecurityToken()).toBeNull();
  });

  it('Should navigate to login view on logoff', () => {
    spyOn(routingService,"navigateToLogin").and.callThrough();
    component.logOff();
    expect(routingService.navigateToLogin).toHaveBeenCalled();
  });

  it('Should navigate to Search view with correct parameter on Search', ()=>{
    spyOn(routingService,`navigateToSearch`).and.callThrough();
    component.searchQuery = new FormControl(`test`);
    component.search();
    expect(routingService.navigateToSearch).toHaveBeenCalledWith(`test`);  
  });    
}); 