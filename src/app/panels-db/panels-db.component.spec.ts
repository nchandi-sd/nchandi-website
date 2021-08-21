import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelsDBComponent } from './panels-db.component';

describe('PanelsDBComponent', () => {
  let component: PanelsDBComponent;
  let fixture: ComponentFixture<PanelsDBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelsDBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelsDBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
