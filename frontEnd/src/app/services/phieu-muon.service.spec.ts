import { TestBed } from '@angular/core/testing';

import { PhieuMuonService } from './phieu-muon.service';

describe('PhieuMuonService', () => {
  let service: PhieuMuonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhieuMuonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
