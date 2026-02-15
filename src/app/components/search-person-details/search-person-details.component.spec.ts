import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPersonDetailsComponent } from './search-person-details.component';

describe('SearchPersonDetailsComponent', () => {
  let component: SearchPersonDetailsComponent;
  let fixture: ComponentFixture<SearchPersonDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchPersonDetailsComponent]
    });
    fixture = TestBed.createComponent(SearchPersonDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
