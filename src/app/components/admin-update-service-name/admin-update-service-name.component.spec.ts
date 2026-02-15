import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpdateServiceNameComponent } from './admin-update-service-name.component';

describe('AdminUpdateServiceNameComponent', () => {
  let component: AdminUpdateServiceNameComponent;
  let fixture: ComponentFixture<AdminUpdateServiceNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminUpdateServiceNameComponent]
    });
    fixture = TestBed.createComponent(AdminUpdateServiceNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
