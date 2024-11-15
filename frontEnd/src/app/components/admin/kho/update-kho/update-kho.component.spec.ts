import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateKhoComponent } from './update-kho.component';

describe('UpdateKhoComponent', () => {
  let component: UpdateKhoComponent;
  let fixture: ComponentFixture<UpdateKhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateKhoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateKhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
