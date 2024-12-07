import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePhieuMuonComponent } from './table-phieu-muon.component';

describe('TablePhieuMuonComponent', () => {
  let component: TablePhieuMuonComponent;
  let fixture: ComponentFixture<TablePhieuMuonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablePhieuMuonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablePhieuMuonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
