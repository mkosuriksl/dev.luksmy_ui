import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpForgotPasswordComponent } from './sp-forgot-password.component';

describe('SpForgotPasswordComponent', () => {
  let component: SpForgotPasswordComponent;
  let fixture: ComponentFixture<SpForgotPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpForgotPasswordComponent]
    });
    fixture = TestBed.createComponent(SpForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
