import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieumuonComponent } from './phieumuon.component';

describe('PhieumuonComponent', () => {
  let component: PhieumuonComponent;
  let fixture: ComponentFixture<PhieumuonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhieumuonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhieumuonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
