import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpProfileComponent } from './sp-profile.component';

describe('SpProfileComponent', () => {
  let component: SpProfileComponent;
  let fixture: ComponentFixture<SpProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpProfileComponent]
    });
    fixture = TestBed.createComponent(SpProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
