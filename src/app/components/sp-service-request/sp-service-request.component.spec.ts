import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpServiceRequestComponent } from './sp-service-request.component';

describe('SpServiceRequestComponent', () => {
  let component: SpServiceRequestComponent;
  let fixture: ComponentFixture<SpServiceRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpServiceRequestComponent]
    });
    fixture = TestBed.createComponent(SpServiceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
