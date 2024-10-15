import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTheloaiComponent } from './add-theloai.component';

describe('AddTheloaiComponent', () => {
  let component: AddTheloaiComponent;
  let fixture: ComponentFixture<AddTheloaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTheloaiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTheloaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
