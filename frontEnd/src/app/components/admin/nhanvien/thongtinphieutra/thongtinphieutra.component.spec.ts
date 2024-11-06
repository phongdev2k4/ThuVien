import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongtinphieutraComponent } from './thongtinphieutra.component';

describe('ThongtinphieutraComponent', () => {
  let component: ThongtinphieutraComponent;
  let fixture: ComponentFixture<ThongtinphieutraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThongtinphieutraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThongtinphieutraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
