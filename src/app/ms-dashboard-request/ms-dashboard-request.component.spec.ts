import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsDashboardRequestComponent } from './ms-dashboard-request.component';

describe('MsDashboardRequestComponent', () => {
  let component: MsDashboardRequestComponent;
  let fixture: ComponentFixture<MsDashboardRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MsDashboardRequestComponent]
    });
    fixture = TestBed.createComponent(MsDashboardRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
