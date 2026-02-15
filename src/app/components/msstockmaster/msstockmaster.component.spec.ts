import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsstockmasterComponent } from './msstockmaster.component';

describe('MsstockmasterComponent', () => {
  let component: MsstockmasterComponent;
  let fixture: ComponentFixture<MsstockmasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MsstockmasterComponent]
    });
    fixture = TestBed.createComponent(MsstockmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
