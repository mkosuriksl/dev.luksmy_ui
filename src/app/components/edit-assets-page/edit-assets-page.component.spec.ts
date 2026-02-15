import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAssetsPageComponent } from './edit-assets-page.component';

describe('EditAssetsPageComponent', () => {
  let component: EditAssetsPageComponent;
  let fixture: ComponentFixture<EditAssetsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAssetsPageComponent]
    });
    fixture = TestBed.createComponent(EditAssetsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
