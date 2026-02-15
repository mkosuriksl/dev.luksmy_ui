import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminServiceNameComponent } from './admin-service-name.component';

describe('AdminServiceNameComponent', () => {
  let component: AdminServiceNameComponent;
  let fixture: ComponentFixture<AdminServiceNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminServiceNameComponent]
    });
    fixture = TestBed.createComponent(AdminServiceNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
