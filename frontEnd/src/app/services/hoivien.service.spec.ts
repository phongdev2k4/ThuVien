import { TestBed } from '@angular/core/testing';

import { HoivienService } from './hoivien.service';

describe('HoivienService', () => {
  let service: HoivienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HoivienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
