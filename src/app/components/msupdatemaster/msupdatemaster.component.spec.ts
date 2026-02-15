import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsupdatemasterComponent } from './msupdatemaster.component';

describe('MsupdatemasterComponent', () => {
  let component: MsupdatemasterComponent;
  let fixture: ComponentFixture<MsupdatemasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MsupdatemasterComponent]
    });
    fixture = TestBed.createComponent(MsupdatemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
