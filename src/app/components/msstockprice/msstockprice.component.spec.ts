import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsstockpriceComponent } from './msstockprice.component';

describe('MsstockpriceComponent', () => {
  let component: MsstockpriceComponent;
  let fixture: ComponentFixture<MsstockpriceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MsstockpriceComponent]
    });
    fixture = TestBed.createComponent(MsstockpriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
