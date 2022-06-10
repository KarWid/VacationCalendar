import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-create-vacation-period-dialog',
  templateUrl: './create-vacation-period-dialog.component.html',
  styleUrls: ['./create-vacation-period-dialog.component.less']
})

export class CreateVacationPeriodDialogComponent{
  minDate: Date;
  firstName: FormControl;
  lastName: FormControl;
  notes: FormControl;


  constructor(
    public dialogRef: MatDialogRef<CreateVacationPeriodDialogComponent, VacationPeriodDialogModel>,
    @Inject(MAT_DIALOG_DATA) public vacationPeriod: VacationPeriodDialogModel
  ){
    var today = new Date();
    this.minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);

    this.firstName = new FormControl(vacationPeriod.firstName, [Validators.maxLength(50), Validators.required]);
    this.lastName = new FormControl(vacationPeriod.firstName, [Validators.maxLength(50), Validators.required]);
    this.notes = new FormControl(vacationPeriod.firstName, [Validators.maxLength(200)]);
  }

  onNoClick(): void{
    this.dialogRef.close();
  }

  getFirstNameErrorMessage(): string{
    if (this.firstName.hasError('required')){
      return "First name is required";
    }
    return this.firstName.hasError('maxlength') ? 'Max length of first name is 50.' : '';
  }

  getLastNameErrorMessage(): string{
    if (this.lastName.hasError('required')){
      return "Last name is required";
    }
    return this.lastName.hasError('maxlength') ? 'Max length of last name is 50.' : '';
  }

  getNotesErrorMessage(): string{
    return this.notes.hasError('maxlength') ? 'Max length of notes is 50.' : '';
  }

  isFormInvalid(){
    var rangeExists = this.vacationPeriod.range !== undefined; // TODO: just a workaround ...

    return this.firstName.invalid || this.lastName.invalid || this.notes.invalid 
      || (rangeExists && (this.vacationPeriod.range.controls['from'].value === null || this.vacationPeriod.range.controls['to'].value === null));
  }
}

// TODO: change it to cleaner implementation
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
