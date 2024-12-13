import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddhoivienComponent } from './addhoivien.component';

describe('AddhoivienComponent', () => {
  let component: AddhoivienComponent;
  let fixture: ComponentFixture<AddhoivienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddhoivienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddhoivienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
