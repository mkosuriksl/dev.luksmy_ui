import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsUpdateProfileComponent } from './ms-update-profile.component';

describe('MsUpdateProfileComponent', () => {
  let component: MsUpdateProfileComponent;
  let fixture: ComponentFixture<MsUpdateProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MsUpdateProfileComponent]
    });
    fixture = TestBed.createComponent(MsUpdateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
