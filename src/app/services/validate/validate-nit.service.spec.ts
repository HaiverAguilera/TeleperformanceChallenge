import { TestBed } from '@angular/core/testing';

import { ValidateNitService } from './validate-nit.service';

describe('ValidateNitService', () => {
  let service: ValidateNitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateNitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
