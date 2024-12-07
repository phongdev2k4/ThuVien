import { TestBed } from '@angular/core/testing';

import { PhieuTraService } from './phieu-tra.service';

describe('PhieuTraService', () => {
  let service: PhieuTraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhieuTraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
