import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSpRentalComponent } from './show-sp-rental.component';

describe('ShowSpRentalComponent', () => {
  let component: ShowSpRentalComponent;
  let fixture: ComponentFixture<ShowSpRentalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowSpRentalComponent]
    });
    fixture = TestBed.createComponent(ShowSpRentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
