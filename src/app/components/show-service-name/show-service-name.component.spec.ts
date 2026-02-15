import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowServiceNameComponent } from './show-service-name.component';

describe('ShowServiceNameComponent', () => {
  let component: ShowServiceNameComponent;
  let fixture: ComponentFixture<ShowServiceNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowServiceNameComponent]
    });
    fixture = TestBed.createComponent(ShowServiceNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
