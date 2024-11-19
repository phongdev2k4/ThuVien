import { TestBed } from '@angular/core/testing';

import { PhieuPhatService } from './phieu-phat.service';

describe('PhieuPhatService', () => {
  let service: PhieuPhatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhieuPhatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
