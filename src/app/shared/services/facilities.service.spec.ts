import { TestBed } from '@angular/core/testing';

import { FacilitiesService } from './facilities.service';

describe('FacilitiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FacilitiesService = TestBed.get(FacilitiesService);
    expect(service).toBeTruthy();
  });
});
