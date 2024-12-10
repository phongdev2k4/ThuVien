import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoivienListComponent } from './hoivien-list.component';

describe('HoivienListComponent', () => {
  let component: HoivienListComponent;
  let fixture: ComponentFixture<HoivienListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoivienListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoivienListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
