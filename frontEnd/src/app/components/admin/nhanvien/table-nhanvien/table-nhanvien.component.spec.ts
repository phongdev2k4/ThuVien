import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableNhanvienComponent } from './table-nhanvien.component';

describe('TableNhanvienComponent', () => {
  let component: TableNhanvienComponent;
  let fixture: ComponentFixture<TableNhanvienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableNhanvienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableNhanvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
