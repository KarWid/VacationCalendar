import { Pipe, PipeTransform } from '@angular/core';
import { CalendarDay } from 'src/view-models/calendar-day';

@Pipe({
  name: 'week'
})
export class WeekPipe implements PipeTransform {
  private weekDaysNumber: number = 7;

  transform(calendarDaysArray: CalendarDay[]): CalendarDay[][] {
    let weekDays: CalendarDay[] = [];
    let calendarDays: CalendarDay[][] = [];

    calendarDaysArray.map((day, index) => {
      weekDays.push(day);

      if (++index % this.weekDaysNumber === 0){
        calendarDays.push(weekDays);
        weekDays = [];
      }
    });

    return calendarDays;
  }
}
