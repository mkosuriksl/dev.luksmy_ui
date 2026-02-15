import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAssetDataComponent } from './edit-asset-data.component';

describe('EditAssetDataComponent', () => {
  let component: EditAssetDataComponent;
  let fixture: ComponentFixture<EditAssetDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAssetDataComponent]
    });
    fixture = TestBed.createComponent(EditAssetDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
