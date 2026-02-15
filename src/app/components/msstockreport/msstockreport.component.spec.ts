import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsstockreportComponent } from './msstockreport.component';

describe('MsstockreportComponent', () => {
  let component: MsstockreportComponent;
  let fixture: ComponentFixture<MsstockreportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MsstockreportComponent]
    });
    fixture = TestBed.createComponent(MsstockreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
