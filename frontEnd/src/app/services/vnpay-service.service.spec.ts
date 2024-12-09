import { TestBed } from '@angular/core/testing';

import { VnpayServiceService } from './vnpay-service.service';

describe('VnpayServiceService', () => {
  let service: VnpayServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VnpayServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
