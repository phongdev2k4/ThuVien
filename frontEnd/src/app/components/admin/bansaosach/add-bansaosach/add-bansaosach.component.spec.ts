import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBansaosachComponent } from './add-bansaosach.component';

describe('AddBansaosachComponent', () => {
  let component: AddBansaosachComponent;
  let fixture: ComponentFixture<AddBansaosachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBansaosachComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBansaosachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
