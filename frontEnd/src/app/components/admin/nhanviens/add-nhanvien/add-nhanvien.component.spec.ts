import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNhanvienComponent } from './add-nhanvien.component';

describe('AddNhanvienComponent', () => {
  let component: AddNhanvienComponent;
  let fixture: ComponentFixture<AddNhanvienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNhanvienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNhanvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
