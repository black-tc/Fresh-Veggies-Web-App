import { TestBed } from '@angular/core/testing';

import { FilterQueryService } from './filter-query.service';

describe('FilterQueryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilterQueryService = TestBed.get(FilterQueryService);
    expect(service).toBeTruthy();
  });
});
