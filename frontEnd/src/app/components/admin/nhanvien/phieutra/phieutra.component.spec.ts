import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieutraComponent } from './phieutra.component';

describe('PhieutraComponent', () => {
  let component: PhieutraComponent;
  let fixture: ComponentFixture<PhieutraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhieutraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhieutraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
