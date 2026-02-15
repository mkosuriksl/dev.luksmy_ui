import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditServiceNameComponent } from './edit-service-name.component';

describe('EditServiceNameComponent', () => {
  let component: EditServiceNameComponent;
  let fixture: ComponentFixture<EditServiceNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditServiceNameComponent]
    });
    fixture = TestBed.createComponent(EditServiceNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
