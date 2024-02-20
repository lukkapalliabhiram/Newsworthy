import{ NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing'; 
import { MatGridListModule } from '@angular/material/grid-list';
import { NewsbycategoryComponent } from './newsbycategory.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';  

describe('NewsbycategoryComponent', () => {
  let component: NewsbycategoryComponent;
  let fixture: ComponentFixture<NewsbycategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsbycategoryComponent ],
      imports:[MatGridListModule,RouterTestingModule,HttpClientTestingModule],
      schemas:[NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsbycategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
