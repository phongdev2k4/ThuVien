import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VnpayThanhcongComponent } from './vnpay-thanhcong.component';

describe('VnpayThanhcongComponent', () => {
  let component: VnpayThanhcongComponent;
  let fixture: ComponentFixture<VnpayThanhcongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VnpayThanhcongComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VnpayThanhcongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
