import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpRegistrationComponent } from './sp-registration.component';

describe('SpRegistrationComponent', () => {
  let component: SpRegistrationComponent;
  let fixture: ComponentFixture<SpRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpRegistrationComponent]
    });
    fixture = TestBed.createComponent(SpRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
