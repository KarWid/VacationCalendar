import { Component, OnInit} from '@angular/core';

import {MatDialog} from '@angular/material/dialog';

import { VacationPeriodDto } from 'src/app/dtos/vacation-period-dto';
import { User } from 'src/app/models/user';
import { VacationPeriod } from 'src/app/models/vacation-period';
import { VacationPeriodService } from 'src/app/services/vacation-period.service';
import { CalendarDay } from 'src/app/view-models/calendar-day';
import { CreateVacationPeriodDialogComponent, VacationPeriodDialogModel } from '../create-vacation-period-dialog/create-vacation-period-dialog.component';
import { UiMessageModel, UiMessageType } from '../models/ui-message-model';
import { UiMessageService } from '../services/ui-message-service.service';

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
    private vacationPeriodService: VacationPeriodService,
    private uiMessageService: UiMessageService) 
  {
    this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.currentDate = this.getFirstDayOfTodayMonth();
    this.updateVacationPeriodsForCurrentMonth();
  }

  ngOnInit(): void {}

  openDialog(){
    const createVacationPeriodDialog = this.dialog.open(CreateVacationPeriodDialogComponent, {
      width: '500px',
      data: new VacationPeriodDialogModel("", "", "", null, null)
    });

    createVacationPeriodDialog.afterClosed().subscribe(result => {
      var vacationPeriod = new VacationPeriod(
        result.firstName, 
        result.lastName, 
        result.notes, 
        this.createDateAsUTC(result.from), 
        this.createDateAsUTC(result.to));

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

    let from = this.getStartDateForCalendar(this.currentDate);
    let to = this.addDaysToDate(from, this.weeksToDisplay * 7); 

    return this.vacationPeriodService
      .getVacationPeriodsByDates(from, to)
      .subscribe(
        response => this.handleVacationPeriods(response.vacationPeriods, from),
        error => {
          this.generateCalendarDays(from);
          alert("Probably api does not work."); // just temporary
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
      result => { 
        this.updateVacationPeriodsForCurrentMonth(); 
        var message = new UiMessageModel(`Vacation period for ${vacationPeriod.firstName} ${vacationPeriod.lastName} successfully created.`, UiMessageType.Success);
        this.uiMessageService.addMessage(message);
      });
  }

  // TODO: Probably move to same date service/helper with some extensions
  /** Returns new Date object increased/decreased by number of days.*/ 
  private addDaysToDate(date: Date, days: number):Date{
    var localDate = new Date(date); // do not change input
    return new Date(localDate.setDate(localDate.getDate() + days));
  }

  /** Returns new Date object increased/decreased by number of months.*/ 
  private addMonthsToDate(date: Date, months: number):Date{
    var localDate = new Date(date); // do not change input
    return new Date(localDate.setMonth(localDate.getMonth() + months));
  }

  /** Returns first day of current month.*/ 
  private getFirstDayOfTodayMonth(): Date{
    var today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0);
  }

  private convertDateToUTC(date:Date): Date { 
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()); 
  } 

  /** Returns new object Date as a UTC time based on the parameter 'date'. */
  private createDateAsUTC(date: Date): Date{
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
  }
}