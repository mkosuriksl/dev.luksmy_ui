import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsShowMaterialRequestComponent } from './ms-show-material-request.component';

describe('MsShowMaterialRequestComponent', () => {
  let component: MsShowMaterialRequestComponent;
  let fixture: ComponentFixture<MsShowMaterialRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MsShowMaterialRequestComponent]
    });
    fixture = TestBed.createComponent(MsShowMaterialRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
