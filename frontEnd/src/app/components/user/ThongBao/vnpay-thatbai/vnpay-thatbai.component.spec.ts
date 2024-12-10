import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VnpayThatbaiComponent } from './vnpay-thatbai.component';

describe('VnpayThatbaiComponent', () => {
  let component: VnpayThatbaiComponent;
  let fixture: ComponentFixture<VnpayThatbaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VnpayThatbaiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VnpayThatbaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
