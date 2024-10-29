import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePhieutraComponent } from './table-phieutra.component';

describe('TablePhieutraComponent', () => {
  let component: TablePhieutraComponent;
  let fixture: ComponentFixture<TablePhieutraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablePhieutraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablePhieutraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
