import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSpRentalComponent } from './update-sp-rental.component';

describe('UpdateSpRentalComponent', () => {
  let component: UpdateSpRentalComponent;
  let fixture: ComponentFixture<UpdateSpRentalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateSpRentalComponent]
    });
    fixture = TestBed.createComponent(UpdateSpRentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
