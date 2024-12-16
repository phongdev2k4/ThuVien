import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XuLiMuonOnlineComponent } from './xu-li-muon-online.component';

describe('XuLiMuonOnlineComponent', () => {
  let component: XuLiMuonOnlineComponent;
  let fixture: ComponentFixture<XuLiMuonOnlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XuLiMuonOnlineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XuLiMuonOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
