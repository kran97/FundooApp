import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('email should be valid',()=> {
    component.email.setValue('as@asd.com');
    expect(component.email.valid).toBeTruthy()
  });
  it('email should be invalid', () => {
    component.email.setValue('');
    expect(component.email.valid).toBeFalsy();
  });
  it('password should be valid', () => {
    component.password.setValue('dcvdfafq');
    expect(component.password.valid).toBeTruthy();
  });
  it('password should be invalid', () => {
    component.password.setValue('');
    expect(component.password.valid).toBeFalsy();
  });
  
});
