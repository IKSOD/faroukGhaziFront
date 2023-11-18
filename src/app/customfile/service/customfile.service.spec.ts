import { TestBed } from '@angular/core/testing';

import { CustomfileService } from './customfile.service';

describe('CustomfileService', () => {
  let service: CustomfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
