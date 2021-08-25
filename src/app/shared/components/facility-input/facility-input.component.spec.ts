import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityInputComponent } from './facility-input.component';

describe('FacilityInputComponent', () => {
  let component: FacilityInputComponent;
  let fixture: ComponentFixture<FacilityInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilityInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
