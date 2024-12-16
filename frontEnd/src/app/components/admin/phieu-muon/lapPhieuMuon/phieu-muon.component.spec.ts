import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuMuonComponent } from './phieu-muon.component';

describe('PhieuMuonComponent', () => {
  let component: PhieuMuonComponent;
  let fixture: ComponentFixture<PhieuMuonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhieuMuonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhieuMuonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
