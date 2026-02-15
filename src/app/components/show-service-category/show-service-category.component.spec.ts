import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowServiceCategoryComponent } from './show-service-category.component';

describe('ShowServiceCategoryComponent', () => {
  let component: ShowServiceCategoryComponent;
  let fixture: ComponentFixture<ShowServiceCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowServiceCategoryComponent]
    });
    fixture = TestBed.createComponent(ShowServiceCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
