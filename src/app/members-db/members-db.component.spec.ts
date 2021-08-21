import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersDBComponent } from './members-db.component';

describe('MembersDBComponent', () => {
  let component: MembersDBComponent;
  let fixture: ComponentFixture<MembersDBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersDBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersDBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
