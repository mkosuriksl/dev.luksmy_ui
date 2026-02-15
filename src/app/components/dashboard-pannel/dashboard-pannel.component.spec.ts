import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPannelComponent } from './dashboard-pannel.component';

describe('DashboardPannelComponent', () => {
  let component: DashboardPannelComponent;
  let fixture: ComponentFixture<DashboardPannelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardPannelComponent]
    });
    fixture = TestBed.createComponent(DashboardPannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
