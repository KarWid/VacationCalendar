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
  range: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateVacationPeriodDialogComponent, VacationPeriodDialogModel>,
    @Inject(MAT_DIALOG_DATA) public vacationPeriod: VacationPeriodDialogModel){
  
      var today = new Date();
      this.minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);

      this.firstName = new FormControl(vacationPeriod.firstName, [Validators.maxLength(50), Validators.required]);
      this.lastName = new FormControl(vacationPeriod.lastName, [Validators.maxLength(50), Validators.required]);
      this.notes = new FormControl(vacationPeriod.notes, [Validators.maxLength(200)]);
      this.range = new FormGroup({
        from: new FormControl<Date | null>(vacationPeriod.from, [Validators.required]),
        to: new FormControl<Date | null>(vacationPeriod.to, [Validators.required]),
      });
  }

  changeFirstName(ev: any){
    this.vacationPeriod.firstName = ev.target.value;
  }

  changeLastName(ev: any){
    this.vacationPeriod.lastName = ev.target.value;
  }

  changeNotes(ev: any){
    this.vacationPeriod.notes = ev.target.value;
  }

  changeFromDate(ev: any){
    this.vacationPeriod.from = ev.value;
  }

  changeToDate(ev: any){
    this.vacationPeriod.to = ev.value;
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
    return this.notes.hasError('maxlength') ? 'Max length of notes is 200.' : '';
  }

  getFromDateErrorMessage(): string{
    return this.range.touched && this.range.controls['from'].hasError('required') ? 'From date is required.' : '';
  }

  getToDateErrorMessage(): string{
    return this.range.touched && this.range.controls['to'].hasError('required') ? 'To date is required.' : '';
  }

  isFormInvalid(){
    return this.firstName.invalid 
      || this.lastName.invalid 
      || this.notes.invalid 
      || this.range.controls['from'].value === null 
      || this.range.controls['to'].value === null;
  }
}

export class VacationPeriodDialogModel {
  constructor(
      public firstName: string,
      public lastName: string,
      public notes: string,
      public from: Date | null,
      public to: Date | null
  ) {}
}