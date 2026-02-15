import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsForgotPasswordComponent } from './ms-forgot-password.component';

describe('MsForgotPasswordComponent', () => {
  let component: MsForgotPasswordComponent;
  let fixture: ComponentFixture<MsForgotPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MsForgotPasswordComponent]
    });
    fixture = TestBed.createComponent(MsForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
