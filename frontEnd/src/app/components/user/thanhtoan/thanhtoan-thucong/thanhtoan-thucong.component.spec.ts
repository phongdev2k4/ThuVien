import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanhtoanThucongComponent } from './thanhtoan-thucong.component';

describe('ThanhtoanThucongComponent', () => {
  let component: ThanhtoanThucongComponent;
  let fixture: ComponentFixture<ThanhtoanThucongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThanhtoanThucongComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThanhtoanThucongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
