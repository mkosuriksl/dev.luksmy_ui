import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpAddServiceComponent } from './sp-add-service.component';

describe('SpAddServiceComponent', () => {
  let component: SpAddServiceComponent;
  let fixture: ComponentFixture<SpAddServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpAddServiceComponent]
    });
    fixture = TestBed.createComponent(SpAddServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
