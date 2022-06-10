import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVacationPeriodDialogComponent } from './create-vacation-period-dialog.component';

describe('CreateVacationPeriodDialogComponent', () => {
  let component: CreateVacationPeriodDialogComponent;
  let fixture: ComponentFixture<CreateVacationPeriodDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateVacationPeriodDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateVacationPeriodDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
