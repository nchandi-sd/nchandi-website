import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitiesDBComponent } from './facilities-db.component';

describe('FacilitiesDBComponent', () => {
  let component: FacilitiesDBComponent;
  let fixture: ComponentFixture<FacilitiesDBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilitiesDBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilitiesDBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
