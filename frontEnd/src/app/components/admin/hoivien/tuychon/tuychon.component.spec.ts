import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuychonComponent } from './tuychon.component';

describe('TuychonComponent', () => {
  let component: TuychonComponent;
  let fixture: ComponentFixture<TuychonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TuychonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TuychonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
