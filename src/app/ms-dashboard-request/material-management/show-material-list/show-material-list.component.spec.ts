import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMaterialListComponent } from './show-material-list.component';

describe('ShowMaterialListComponent', () => {
  let component: ShowMaterialListComponent;
  let fixture: ComponentFixture<ShowMaterialListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowMaterialListComponent]
    });
    fixture = TestBed.createComponent(ShowMaterialListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
