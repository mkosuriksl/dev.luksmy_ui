import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAssetsCategoriesComponent } from './show-assets-categories.component';

describe('ShowAssetsCategoriesComponent', () => {
  let component: ShowAssetsCategoriesComponent;
  let fixture: ComponentFixture<ShowAssetsCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowAssetsCategoriesComponent]
    });
    fixture = TestBed.createComponent(ShowAssetsCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
