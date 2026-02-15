import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpSupplierComponent } from './sp-supplier.component';

describe('SpSupplierComponent', () => {
  let component: SpSupplierComponent;
  let fixture: ComponentFixture<SpSupplierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpSupplierComponent]
    });
    fixture = TestBed.createComponent(SpSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
