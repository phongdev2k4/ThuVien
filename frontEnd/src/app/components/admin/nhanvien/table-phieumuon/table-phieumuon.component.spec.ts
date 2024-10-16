import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePhieumuonComponent } from './table-phieumuon.component';

describe('TablePhieumuonComponent', () => {
  let component: TablePhieumuonComponent;
  let fixture: ComponentFixture<TablePhieumuonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablePhieumuonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablePhieumuonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
