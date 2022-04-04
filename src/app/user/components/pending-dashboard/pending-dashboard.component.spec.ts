import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingDashboardComponent } from './pending-dashboard.component';

describe('PendingDashboardComponent', () => {
  let component: PendingDashboardComponent;
  let fixture: ComponentFixture<PendingDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
