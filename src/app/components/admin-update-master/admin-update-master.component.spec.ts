import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpdateMasterComponent } from './admin-update-master.component';

describe('AdminUpdateMasterComponent', () => {
  let component: AdminUpdateMasterComponent;
  let fixture: ComponentFixture<AdminUpdateMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminUpdateMasterComponent]
    });
    fixture = TestBed.createComponent(AdminUpdateMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
