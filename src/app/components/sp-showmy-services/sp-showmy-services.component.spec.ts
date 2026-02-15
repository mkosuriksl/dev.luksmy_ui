import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpShowmyServicesComponent } from './sp-showmy-services.component';

describe('SpShowmyServicesComponent', () => {
  let component: SpShowmyServicesComponent;
  let fixture: ComponentFixture<SpShowmyServicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpShowmyServicesComponent]
    });
    fixture = TestBed.createComponent(SpShowmyServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
