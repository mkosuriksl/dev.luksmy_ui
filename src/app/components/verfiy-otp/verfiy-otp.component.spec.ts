import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerfiyOtpComponent } from './verfiy-otp.component';

describe('VerfiyOtpComponent', () => {
  let component: VerfiyOtpComponent;
  let fixture: ComponentFixture<VerfiyOtpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerfiyOtpComponent]
    });
    fixture = TestBed.createComponent(VerfiyOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
