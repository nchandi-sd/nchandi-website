import { TestBed } from '@angular/core/testing';

import { PanelMemberService } from './panel-member.service';

describe('PanelMemberService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PanelMemberService = TestBed.get(PanelMemberService);
    expect(service).toBeTruthy();
  });
});
