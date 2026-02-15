import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpUpdateProfileComponent } from './sp-update-profile.component';

describe('SpUpdateProfileComponent', () => {
  let component: SpUpdateProfileComponent;
  let fixture: ComponentFixture<SpUpdateProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpUpdateProfileComponent]
    });
    fixture = TestBed.createComponent(SpUpdateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
