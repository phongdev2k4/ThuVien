import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddkhoComponent } from './addkho.component';

describe('AddkhoComponent', () => {
  let component: AddkhoComponent;
  let fixture: ComponentFixture<AddkhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddkhoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddkhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
