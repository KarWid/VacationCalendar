import { Component, OnInit } from '@angular/core';
import { CalendarDay } from 'src/view-models/calendar-day';

@Component({
  selector: 'app-custom-calendar',
  templateUrl: './custom-calendar.component.html',
  styleUrls: ['./custom-calendar.component.less']
})
export class CustomCalendarComponent implements OnInit {
  private weeksToDisplay: number = 5;
  public calendarDays: CalendarDay[] = [];
  public monthNames: string[];

  constructor() {
    this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  }

  ngOnInit(): void {
    this.generateCalendarDays();
  }

  private generateCalendarDays():void{
    this.calendarDays = [];

    let day: Date = new Date();
    let startingDateOfCalendar = this.getStartDateForCalendar(day);
    let dateToAdd = startingDateOfCalendar;

    for (var i=0; i < this.weeksToDisplay * 7; i++, dateToAdd = this.addDaysToDate(dateToAdd, 1)){
      this.calendarDays.push(new CalendarDay(new Date(dateToAdd)));
    }
  }

  // returns last sunday of the previous month or first sunday of the current month
  private getStartDateForCalendar(selectedDate: Date){
    let lastDayOfPreviousMonth = new Date(selectedDate.setDate(0));

    let startingDateOfCalendar: Date = lastDayOfPreviousMonth;

    // find the last Sunday of previous month
    if (startingDateOfCalendar.getDay() != 0){
      while( startingDateOfCalendar.getDay() != 0){
        startingDateOfCalendar = this.addDaysToDate(startingDateOfCalendar, -1);
      }
    }

    return startingDateOfCalendar;
  }

  // TODO: To analyze if a better solution exists to do something like Date.AddDays(-1)
  private addDaysToDate(date: Date, days: number):Date{
    return new Date(date.setDate(date.getDate() + days));
  }
}
