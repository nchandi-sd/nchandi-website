import { TestBed } from '@angular/core/testing';

import { PendingService } from './pending.service';

describe('PendingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PendingService = TestBed.get(PendingService);
    expect(service).toBeTruthy();
  });
});
