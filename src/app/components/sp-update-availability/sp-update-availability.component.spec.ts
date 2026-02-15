import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpUpdateAvailabilityComponent } from './sp-update-availability.component';

describe('SpUpdateAvailabilityComponent', () => {
  let component: SpUpdateAvailabilityComponent;
  let fixture: ComponentFixture<SpUpdateAvailabilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpUpdateAvailabilityComponent]
    });
    fixture = TestBed.createComponent(SpUpdateAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
