import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpRentalComponent } from './add-sp-rental.component';

describe('AddSpRentalComponent', () => {
  let component: AddSpRentalComponent;
  let fixture: ComponentFixture<AddSpRentalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSpRentalComponent]
    });
    fixture = TestBed.createComponent(AddSpRentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
