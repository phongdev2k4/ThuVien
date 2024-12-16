import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilestaffEditComponent } from './profilestaff-edit.component';

describe('ProfilestaffEditComponent', () => {
  let component: ProfilestaffEditComponent;
  let fixture: ComponentFixture<ProfilestaffEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilestaffEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilestaffEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
