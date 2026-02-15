import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsshowmasterComponent } from './msshowmaster.component';

describe('MsshowmasterComponent', () => {
  let component: MsshowmasterComponent;
  let fixture: ComponentFixture<MsshowmasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MsshowmasterComponent]
    });
    fixture = TestBed.createComponent(MsshowmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
