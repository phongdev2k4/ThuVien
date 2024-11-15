import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaoLoiPhieuTraComponent } from './bao-loi-phieu-tra.component';

describe('BaoLoiPhieuTraComponent', () => {
  let component: BaoLoiPhieuTraComponent;
  let fixture: ComponentFixture<BaoLoiPhieuTraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaoLoiPhieuTraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaoLoiPhieuTraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
