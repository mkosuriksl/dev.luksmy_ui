import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcServiceRequestComponent } from './ec-service-request.component';

describe('EcServiceRequestComponent', () => {
  let component: EcServiceRequestComponent;
  let fixture: ComponentFixture<EcServiceRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EcServiceRequestComponent]
    });
    fixture = TestBed.createComponent(EcServiceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
