import { TestBed } from '@angular/core/testing';

import { ApiendpointsService } from './apiendpoints.service';

describe('ApiendpointsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiendpointsService = TestBed.get(ApiendpointsService);
    expect(service).toBeTruthy();
  });
});
