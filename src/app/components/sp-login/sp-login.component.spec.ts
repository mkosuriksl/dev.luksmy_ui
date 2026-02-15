import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpLoginComponent } from './sp-login.component';

describe('SpLoginComponent', () => {
  let component: SpLoginComponent;
  let fixture: ComponentFixture<SpLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpLoginComponent]
    });
    fixture = TestBed.createComponent(SpLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
