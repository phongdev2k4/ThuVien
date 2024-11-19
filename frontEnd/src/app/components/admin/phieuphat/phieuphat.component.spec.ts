import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuphatComponent } from './phieuphat.component';

describe('PhieuphatComponent', () => {
  let component: PhieuphatComponent;
  let fixture: ComponentFixture<PhieuphatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhieuphatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhieuphatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
