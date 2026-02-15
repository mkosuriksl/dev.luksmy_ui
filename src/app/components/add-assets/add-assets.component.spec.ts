import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssetsComponent } from './add-assets.component';

describe('AddAssetsComponent', () => {
  let component: AddAssetsComponent;
  let fixture: ComponentFixture<AddAssetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAssetsComponent]
    });
    fixture = TestBed.createComponent(AddAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
