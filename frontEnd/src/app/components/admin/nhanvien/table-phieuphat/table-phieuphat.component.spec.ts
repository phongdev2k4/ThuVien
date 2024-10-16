import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePhieuphatComponent } from './table-phieuphat.component';

describe('TablePhieuphatComponent', () => {
  let component: TablePhieuphatComponent;
  let fixture: ComponentFixture<TablePhieuphatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablePhieuphatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablePhieuphatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
