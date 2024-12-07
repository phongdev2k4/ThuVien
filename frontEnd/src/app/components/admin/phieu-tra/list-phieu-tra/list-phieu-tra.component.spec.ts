import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPhieuTraComponent } from './list-phieu-tra.component';

describe('ListPhieuTraComponent', () => {
  let component: ListPhieuTraComponent;
  let fixture: ComponentFixture<ListPhieuTraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPhieuTraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPhieuTraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
