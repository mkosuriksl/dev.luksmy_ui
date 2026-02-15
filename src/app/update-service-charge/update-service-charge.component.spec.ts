import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateServiceChargeComponent } from './update-service-charge.component';

describe('UpdateServiceChargeComponent', () => {
  let component: UpdateServiceChargeComponent;
  let fixture: ComponentFixture<UpdateServiceChargeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateServiceChargeComponent]
    });
    fixture = TestBed.createComponent(UpdateServiceChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
