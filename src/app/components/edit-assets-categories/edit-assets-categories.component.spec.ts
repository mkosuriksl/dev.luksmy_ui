import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAssetsCategoriesComponent } from './edit-assets-categories.component';

describe('EditAssetsCategoriesComponent', () => {
  let component: EditAssetsCategoriesComponent;
  let fixture: ComponentFixture<EditAssetsCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAssetsCategoriesComponent]
    });
    fixture = TestBed.createComponent(EditAssetsCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
