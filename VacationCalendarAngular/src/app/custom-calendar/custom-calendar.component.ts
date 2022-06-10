import { Component, OnInit, Inject } from '@angular/core';

import {MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { VacationPeriodDto } from 'src/dtos/vacation-period-dto';
import { User } from 'src/models/user';
import { VacationPeriod } from 'src/models/vacation-period';
import { VacationPeriodService } from 'src/services/vacation-period.service';
import { CalendarDay } from 'src/view-models/calendar-day';
import { CreateVacationPeriodDialogComponent, VacationPeriodDialogModel } from '../create-vacation-period-dialog/create-vacation-period-dialog.component';

@Component({
  selector: 'app-custom-calendar',
  templateUrl: './custom-calendar.component.html',
  styleUrls: ['./custom-calendar.component.less']
})

export class CustomCalendarComponent implements OnInit {
  private weeksToDisplay: number = 5;
  private vacationPeriods: Array<VacationPeriodDto> = new Array<VacationPeriodDto>();;
  private currentDate: Date;
  private currentSelectedUserId: string = "";

  public calendarDays: CalendarDay[] = [];
  public users: Array<User> = new Array<User>();

  public monthNames: string[];

  constructor(
    public dialog: MatDialog,
    private vacationPeriodService: VacationPeriodService) 
  {
    this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.currentDate = this.getFirstDayOfTodayMonth();
    this.updateVacationPeriodsForCurrentMonth();
  }

  ngOnInit(): void {
    
  }

  openDialog(){
    const dialogRef = this.dialog.open(CreateVacationPeriodDialogComponent, {
      width: '500px', // TODO: to change
      data: new VacationPeriodDialogModel("", "", "")
    });

    // TODO: define type of result
    dialogRef.afterClosed().subscribe(result => {
      // TODO: probably it can be done better
      var from = this.createDateAsUTC(result.range.controls.from.value);
      var to = this.createDateAsUTC(result.range.controls.to.value);

      var vacationPeriod = new VacationPeriod(
        result.firstName, 
        result.lastName, 
        result.notes, 
        from, 
        to);

      this.createVacationPeriod(vacationPeriod);
    });
  }

  setNextMonth(){
    this.currentDate = this.addMonthsToDate(this.currentDate, 1);
    this.updateVacationPeriodsForCurrentMonth();
  }

  setPreviousMonth(){
    this.currentDate = this.addMonthsToDate(this.currentDate, -1);
    this.updateVacationPeriodsForCurrentMonth();
  }

  setCurrentMonth(){
    this.currentDate = this.getFirstDayOfTodayMonth();
    this.updateVacationPeriodsForCurrentMonth();
  }

  getCurrentDate():Date{
    return this.currentDate;
  }

  onUserSelected(userId: string){
    this.currentSelectedUserId = userId;

    var from = this.calendarDays[0].date;
    this.generateCalendarDays(from);
  }

  private updateVacationPeriodsForCurrentMonth(){
    this.currentSelectedUserId = "";

    let from = this.getStartDateForCalendar(this.currentDate); // TODO: to check localization, is it utc ? if something fails, it is here
    let to = this.addDaysToDate(from, this.weeksToDisplay * 7); 

    return this.vacationPeriodService
      .getVacationPeriodsByDates(from, to)
      .subscribe(
        response => this.handleVacationPeriods(response.vacationPeriods, from),
        err => {
          alert("Api does not work!");
          this.generateCalendarDays(from);
        });
  }

  private handleVacationPeriods(vacationPeriods: Array<VacationPeriodDto>, from: Date){
    this.vacationPeriods = vacationPeriods;
    this.users = new Array<User>();
    
    vacationPeriods.forEach(vacationPeriod => {
      if (!this.users.some(user => user.id === vacationPeriod.userId)){
        this.users.push(new User(vacationPeriod.userId, vacationPeriod.firstName, vacationPeriod.lastName));
      }
    });

    this.generateCalendarDays(from);
  }

  private generateCalendarDays(from: Date):void{
    this.calendarDays = [];

    let currentDay = from;
    let anyVacationPeriods = this.vacationPeriods.length > 0;
    
    // TODO: iterate to 'to'
    for (var i=0; i < this.weeksToDisplay * 7; i++, currentDay = this.addDaysToDate(currentDay, 1)){
      var dayVacationPeriods = anyVacationPeriods 
        ? this.getVacationPeriodsByDayFromCollection(currentDay) 
        : new Array<VacationPeriodDto>();

      this.calendarDays.push(new CalendarDay(new Date(currentDay), dayVacationPeriods));
    }
}

  private getVacationPeriodsByDayFromCollection(date: Date) :Array<VacationPeriodDto>{
    var result: Array<VacationPeriodDto> = new Array<VacationPeriodDto>();
    if (this.vacationPeriods.length === 0){
      return result;
    }

    var userSelected = this.currentSelectedUserId !== "" && this.currentSelectedUserId !== undefined;

    this.vacationPeriods.forEach(vacationPeriod => {
      // if user is selected then check if the vacation period is defined for the user, if a user was not selected then get all vacation periods
      var isUsersVacationPeriod = userSelected ? vacationPeriod.userId === this.currentSelectedUserId : true; 

      if (isUsersVacationPeriod && date >= vacationPeriod.from && date <= vacationPeriod.to){
        result.push(vacationPeriod); // use the vacationPeriod reference to avoid memory allocation issues
      }
    })

    return result;
  }

  // returns last sunday of the previous month or first sunday of the current month
  private getStartDateForCalendar(selectedDate: Date){
    var localDate = new Date(selectedDate);
    let lastDayOfPreviousMonth = new Date(localDate.setDate(0));

    let startingDateOfCalendar: Date = lastDayOfPreviousMonth;

    // find the last Sunday of previous month
    if (startingDateOfCalendar.getDay() != 0){
      while( startingDateOfCalendar.getDay() != 0){
        startingDateOfCalendar = this.addDaysToDate(startingDateOfCalendar, -1);
      }
    }

    return startingDateOfCalendar;
  }

  private createVacationPeriod(vacationPeriod: VacationPeriod){
    this.vacationPeriodService.addVacationPeriod(vacationPeriod).subscribe(
      result => { alert(JSON.stringify(result)); },
      err => { alert(err.error.Errors);});
      // err => { alert(JSON.stringify(err)); console.log(err);});
  }

  // TODO: Probably move to same date service/helper with some extensions
  // TODO: To analyze if a better solution exists to do something like Date.AddDays(-1)
  // TODO: Analyze the date references
  // TODO: It could be done better
  private addDaysToDate(date: Date, days: number):Date{
    var localDate = new Date(date); // do not change input
    return new Date(localDate.setDate(localDate.getDate() + days));
  }

  private addMonthsToDate(date: Date, months: number):Date{
    var localDate = new Date(date); // do not change input
    return new Date(localDate.setMonth(localDate.getMonth() + months));
  }

  private getFirstDayOfTodayMonth(): Date{
    var today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0);
  }

  private convertDateToUTC(date:Date): Date { 
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()); 
  } 

  private createDateAsUTC(date: Date): Date{
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
  }
}