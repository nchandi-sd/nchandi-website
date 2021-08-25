import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelInputComponent } from './panel-input.component';

describe('PanelInputComponent', () => {
  let component: PanelInputComponent;
  let fixture: ComponentFixture<PanelInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
