import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitiesDashboardComponent } from './facilities-dashboard.component';

describe('FacilitiesDashboardComponent', () => {
  let component: FacilitiesDashboardComponent;
  let fixture: ComponentFixture<FacilitiesDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilitiesDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilitiesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
