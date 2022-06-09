import { Component } from '@angular/core';
import { VacationPeriodDto } from 'src/dtos/vacation-period-dto';
import { VacationPeriod } from 'src/models/vacation-period';
import { VacationPeriodService } from 'src/services/vacation-period.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  constructor(private vacationPeriodService: VacationPeriodService){}

  ngOnInit(): void{
    var from = new Date(2022, 5, 1);
    var to = new Date(2022, 5, 30);

    // var result = this.vacationPeriodService
    //   .getVacationPeriodsByDates(from, to)
    //   .subscribe(data => this.handleVacationPeriods(data.vacationPeriods));

    // this.createVacationPeriod();
  }

  private handleVacationPeriods(vacationPeriods: VacationPeriodDto[]){

  }

  private createVacationPeriod(){
    var from = new Date(Date.UTC(2022, 5, 12)); // TODO: Just a workaround to send time in UTC, we only need short date
    var to = new Date(Date.UTC(2022, 5, 14));

    this.vacationPeriodService
      .addVacationPeriod(new VacationPeriod("Karol", "Widla", "My notes 2", from, to))
      .subscribe(response => console.log(response));
  }

  title = 'Vacation Calendar';
}
