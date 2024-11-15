import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KholistComponent } from './kholist.component';

describe('KholistComponent', () => {
  let component: KholistComponent;
  let fixture: ComponentFixture<KholistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KholistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KholistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
