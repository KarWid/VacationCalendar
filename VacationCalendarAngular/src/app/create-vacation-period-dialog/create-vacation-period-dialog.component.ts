import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { VacationPeriod } from 'src/models/vacation-period';

@Component({
  selector: 'app-create-vacation-period-dialog',
  templateUrl: './create-vacation-period-dialog.component.html',
  styleUrls: ['./create-vacation-period-dialog.component.less']
})

export class CreateVacationPeriodDialogComponent{
  constructor(
    public dialogRef: MatDialogRef<CreateVacationPeriodDialogComponent, VacationPeriodDialogModel>,
    @Inject(MAT_DIALOG_DATA) public vacationPeriod: VacationPeriodDialogModel
  ){}

  onNoClick(): void{
    this.dialogRef.close();
  }
}

export class VacationPeriodDialogModel {
  public range: FormGroup;

  constructor(
      public firstName: string,
      public lastName: string,
      public notes: string,
  ) {
    this.range = new FormGroup({
      from: new FormControl<Date | null>(null),
      to: new FormControl<Date | null>(null),
    });
  }
}
