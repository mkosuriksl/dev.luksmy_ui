import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcDashboardPannelComponent } from './ec-dashboard-pannel.component';

describe('EcDashboardPannelComponent', () => {
  let component: EcDashboardPannelComponent;
  let fixture: ComponentFixture<EcDashboardPannelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EcDashboardPannelComponent]
    });
    fixture = TestBed.createComponent(EcDashboardPannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
