import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsVerifyOtpComponent } from './ms-verify-otp.component';

describe('MsVerifyOtpComponent', () => {
  let component: MsVerifyOtpComponent;
  let fixture: ComponentFixture<MsVerifyOtpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MsVerifyOtpComponent]
    });
    fixture = TestBed.createComponent(MsVerifyOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
