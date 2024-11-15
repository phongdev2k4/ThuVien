import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LapPhieuTraComponent } from './lap-phieu-tra.component';

describe('LapPhieuTraComponent', () => {
  let component: LapPhieuTraComponent;
  let fixture: ComponentFixture<LapPhieuTraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LapPhieuTraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LapPhieuTraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
