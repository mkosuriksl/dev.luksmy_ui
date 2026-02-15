import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStockMasterComponent } from './admin-stock-master.component';

describe('AdminStockMasterComponent', () => {
  let component: AdminStockMasterComponent;
  let fixture: ComponentFixture<AdminStockMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminStockMasterComponent]
    });
    fixture = TestBed.createComponent(AdminStockMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
