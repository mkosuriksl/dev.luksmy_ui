import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsprofileComponent } from './msprofile.component';

describe('MsprofileComponent', () => {
  let component: MsprofileComponent;
  let fixture: ComponentFixture<MsprofileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MsprofileComponent]
    });
    fixture = TestBed.createComponent(MsprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
