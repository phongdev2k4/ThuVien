import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LapPhieuMuonOnlineComponent } from './lap-phieu-muon-online.component';

describe('LapPhieuMuonOnlineComponent', () => {
  let component: LapPhieuMuonOnlineComponent;
  let fixture: ComponentFixture<LapPhieuMuonOnlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LapPhieuMuonOnlineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LapPhieuMuonOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
