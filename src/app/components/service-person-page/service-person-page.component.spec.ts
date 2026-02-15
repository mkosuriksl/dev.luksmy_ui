import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePersonPageComponent } from './service-person-page.component';

describe('ServicePersonPageComponent', () => {
  let component: ServicePersonPageComponent;
  let fixture: ComponentFixture<ServicePersonPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicePersonPageComponent]
    });
    fixture = TestBed.createComponent(ServicePersonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
