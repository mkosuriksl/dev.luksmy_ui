import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowMasterComponent } from './admin-show-master.component';

describe('AdminShowMasterComponent', () => {
  let component: AdminShowMasterComponent;
  let fixture: ComponentFixture<AdminShowMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminShowMasterComponent]
    });
    fixture = TestBed.createComponent(AdminShowMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
