import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServiceChargesComponent } from './add-service-charges.component';

describe('AddServiceChargesComponent', () => {
  let component: AddServiceChargesComponent;
  let fixture: ComponentFixture<AddServiceChargesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddServiceChargesComponent]
    });
    fixture = TestBed.createComponent(AddServiceChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
