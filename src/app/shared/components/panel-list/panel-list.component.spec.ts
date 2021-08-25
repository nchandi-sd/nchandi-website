import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelListComponent } from './panel-list.component';

describe('PanelListComponent', () => {
  let component: PanelListComponent;
  let fixture: ComponentFixture<PanelListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
