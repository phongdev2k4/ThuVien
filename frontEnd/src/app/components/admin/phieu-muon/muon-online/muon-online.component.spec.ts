import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuonOnlineComponent } from './muon-online.component';

describe('MuonOnlineComponent', () => {
  let component: MuonOnlineComponent;
  let fixture: ComponentFixture<MuonOnlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuonOnlineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuonOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
