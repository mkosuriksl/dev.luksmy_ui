import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpResetPasswordComponent } from './sp-reset-password.component';

describe('SpResetPasswordComponent', () => {
  let component: SpResetPasswordComponent;
  let fixture: ComponentFixture<SpResetPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpResetPasswordComponent]
    });
    fixture = TestBed.createComponent(SpResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
