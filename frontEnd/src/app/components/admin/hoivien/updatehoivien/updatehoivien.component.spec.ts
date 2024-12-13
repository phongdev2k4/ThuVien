import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatehoivienComponent } from './updatehoivien.component';

describe('UpdatehoivienComponent', () => {
  let component: UpdatehoivienComponent;
  let fixture: ComponentFixture<UpdatehoivienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatehoivienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatehoivienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
