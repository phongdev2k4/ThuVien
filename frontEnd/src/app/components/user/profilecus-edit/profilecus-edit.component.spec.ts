import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilecusEditComponent } from './profilecus-edit.component';

describe('ProfilecusEditComponent', () => {
  let component: ProfilecusEditComponent;
  let fixture: ComponentFixture<ProfilecusEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilecusEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilecusEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
