import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowServiceChargesComponent } from './show-service-charges.component';

describe('ShowServiceChargesComponent', () => {
  let component: ShowServiceChargesComponent;
  let fixture: ComponentFixture<ShowServiceChargesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowServiceChargesComponent]
    });
    fixture = TestBed.createComponent(ShowServiceChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
