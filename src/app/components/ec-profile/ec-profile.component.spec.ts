import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcProfileComponent } from './ec-profile.component';

describe('EcProfileComponent', () => {
  let component: EcProfileComponent;
  let fixture: ComponentFixture<EcProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EcProfileComponent]
    });
    fixture = TestBed.createComponent(EcProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
