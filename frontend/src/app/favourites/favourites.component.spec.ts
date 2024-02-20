import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatGridListModule } from '@angular/material/grid-list';
import { FavouritesComponent } from './favourites.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RoutingService } from '../services/routing.service';

describe('FavouritesComponent', () => {
  let component: FavouritesComponent;
  let fixture: ComponentFixture<FavouritesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FavouritesComponent],
      imports: [MatGridListModule, HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [RoutingService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
