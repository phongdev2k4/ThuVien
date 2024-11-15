import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuTraComponent } from './phieu-tra.component';

describe('PhieuTraComponent', () => {
  let component: PhieuTraComponent;
  let fixture: ComponentFixture<PhieuTraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhieuTraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhieuTraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
