import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Timkiemsach1keyComponent } from './timkiemsach1key.component';

describe('Timkiemsach1keyComponent', () => {
  let component: Timkiemsach1keyComponent;
  let fixture: ComponentFixture<Timkiemsach1keyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Timkiemsach1keyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Timkiemsach1keyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
