import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialDeliveryStatusComponent } from './material-delivery-status.component';

describe('MaterialDeliveryStatusComponent', () => {
  let component: MaterialDeliveryStatusComponent;
  let fixture: ComponentFixture<MaterialDeliveryStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialDeliveryStatusComponent]
    });
    fixture = TestBed.createComponent(MaterialDeliveryStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
