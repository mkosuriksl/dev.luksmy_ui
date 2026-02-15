import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpUpdateServiceComponent } from './sp-update-service.component';

describe('SpUpdateServiceComponent', () => {
  let component: SpUpdateServiceComponent;
  let fixture: ComponentFixture<SpUpdateServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpUpdateServiceComponent]
    });
    fixture = TestBed.createComponent(SpUpdateServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
