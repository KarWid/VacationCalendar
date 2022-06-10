import { Component, OnInit } from '@angular/core';
import { VacationPeriodDto } from 'src/dtos/vacation-period-dto';
import { VacationPeriodService } from 'src/services/vacation-period.service';
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
  public currentDate: Date;

  constructor(private vacationPeriodService: VacationPeriodService) 
  {
    this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.currentDate = this.getFirstDayOfTodayMonth();
  }

  ngOnInit(): void {
    this.updateVacationPeriodsForCurrentMonth();
  }

  public setNextMonth(){
    this.currentDate = this.addMonthsToDate(this.currentDate, 1);
    this.updateVacationPeriodsForCurrentMonth();
  }

  public setPreviousMonth(){
    this.currentDate = this.addMonthsToDate(this.currentDate, -1);
    this.updateVacationPeriodsForCurrentMonth();
  }

  public setCurrentMonth(){
    this.currentDate = this.getFirstDayOfTodayMonth();
    this.updateVacationPeriodsForCurrentMonth();
  }

  private updateVacationPeriodsForCurrentMonth(){
    let from = this.getStartDateForCalendar(this.currentDate); // TODO: to check localization, is it utc ? if something fails, it is here
    let to = this.addDaysToDate(from, this.weeksToDisplay * 7); 

    return this.vacationPeriodService
      .getVacationPeriodsByDates(from, to)
      .subscribe(response => 
        this.generateCalendarDays(response.vacationPeriods, from)
      );
  }

  private generateCalendarDays(vacationPeriods: Array<VacationPeriodDto>, startingDateOfCalendar: Date):void{
    this.calendarDays = [];

    let dateToAdd = startingDateOfCalendar;
    
    for (var i=0; i < this.weeksToDisplay * 7; i++, dateToAdd = this.addDaysToDate(dateToAdd, 1)){
      this.calendarDays.push(new CalendarDay(new Date(dateToAdd), this.getVacationPeriodsByDayFromCollection(vacationPeriods, dateToAdd)));
    }
  }

  private getVacationPeriodsByDayFromCollection(vacationPeriods: Array<VacationPeriodDto>, date: Date) :Array<VacationPeriodDto>{
    var result: Array<VacationPeriodDto> = new Array<VacationPeriodDto>();
    if (vacationPeriods.length === 0){
      return result;
    }

    vacationPeriods.forEach(vacationPeriod => {
      if (date >= vacationPeriod.from && date <= vacationPeriod.to){
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

  private getLastDayOfMonth(date: Date):Date{
    var result = this.addMonthsToDate(date, 1);
    return new Date(result.setDate(0));
  }
}
