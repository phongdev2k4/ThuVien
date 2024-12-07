import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBansaosachComponent } from './update-bansaosach.component';

describe('UpdateBansaosachComponent', () => {
  let component: UpdateBansaosachComponent;
  let fixture: ComponentFixture<UpdateBansaosachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateBansaosachComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateBansaosachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
