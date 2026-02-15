import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowChargeComponent } from './admin-show-charge.component';

describe('AdminShowChargeComponent', () => {
  let component: AdminShowChargeComponent;
  let fixture: ComponentFixture<AdminShowChargeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminShowChargeComponent]
    });
    fixture = TestBed.createComponent(AdminShowChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
