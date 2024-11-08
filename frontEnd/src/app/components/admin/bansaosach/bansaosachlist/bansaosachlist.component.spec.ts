import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BansaosachlistComponent } from './bansaosachlist.component';

describe('BansaosachlistComponent', () => {
  let component: BansaosachlistComponent;
  let fixture: ComponentFixture<BansaosachlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BansaosachlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BansaosachlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
