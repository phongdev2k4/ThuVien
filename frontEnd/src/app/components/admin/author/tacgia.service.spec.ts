import { TestBed } from '@angular/core/testing';

import { TacgiaService } from './tacgia.service';

describe('TacgiaService', () => {
  let service: TacgiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TacgiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
