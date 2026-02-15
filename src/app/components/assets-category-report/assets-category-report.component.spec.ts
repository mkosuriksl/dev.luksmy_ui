import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsCategoryReportComponent } from './assets-category-report.component';

describe('AssetsCategoryReportComponent', () => {
  let component: AssetsCategoryReportComponent;
  let fixture: ComponentFixture<AssetsCategoryReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssetsCategoryReportComponent]
    });
    fixture = TestBed.createComponent(AssetsCategoryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
