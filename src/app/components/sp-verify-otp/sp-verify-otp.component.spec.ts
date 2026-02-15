import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpVerifyOtpComponent } from './sp-verify-otp.component';

describe('SpVerifyOtpComponent', () => {
  let component: SpVerifyOtpComponent;
  let fixture: ComponentFixture<SpVerifyOtpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpVerifyOtpComponent]
    });
    fixture = TestBed.createComponent(SpVerifyOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
