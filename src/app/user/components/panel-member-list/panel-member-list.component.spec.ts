import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelMemberListComponent } from './panel-member-list.component';

describe('PanelMemberListComponent', () => {
  let component: PanelMemberListComponent;
  let fixture: ComponentFixture<PanelMemberListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelMemberListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelMemberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
