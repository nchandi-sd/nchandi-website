import { TestBed } from '@angular/core/testing';

import { ResourceSubmissionService } from './resource-submission.service';

describe('ResourceSubmissionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResourceSubmissionService = TestBed.get(ResourceSubmissionService);
    expect(service).toBeTruthy();
  });
});
