import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRentalComponent } from './show-rental.component';

describe('ShowRentalComponent', () => {
  let component: ShowRentalComponent;
  let fixture: ComponentFixture<ShowRentalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowRentalComponent]
    });
    fixture = TestBed.createComponent(ShowRentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
