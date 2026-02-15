import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssetsCategoriesComponent } from './add-assets-categories.component';

describe('AddAssetsCategoriesComponent', () => {
  let component: AddAssetsCategoriesComponent;
  let fixture: ComponentFixture<AddAssetsCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAssetsCategoriesComponent]
    });
    fixture = TestBed.createComponent(AddAssetsCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
