import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { ApiService } from './api.service';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { formatDate } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { GetVacationPeriodsByDatesResponse } from 'src/dtos/responses/get-vacation-periods-by-dates-response';
import { VacationPeriod } from 'src/models/vacation-period';
import { CreateVacationPeriodResponse } from 'src/dtos/responses/create-vacation-period-response';

@Injectable({
  providedIn: 'root'
})

export class VacationPeriodService {
  constructor(
    private apiService: ApiService,
    @Inject(LOCALE_ID) private locale_id: string) { }

  public getVacationPeriodsByDates(from: Date, to: Date) : Observable<GetVacationPeriodsByDatesResponse>  {
    // TODO: add validation

    let httpParams = new HttpParams()
      .append("from", this.ToShortDateAsString(from))
      .append("to", this.ToShortDateAsString(to));
      
    return this.apiService
      .get<GetVacationPeriodsByDatesResponse>('/VacationPeriod', httpParams)
      .pipe(map(data => new GetVacationPeriodsByDatesResponse(data.result.vacationPeriods)));
  }

  public addVacationPeriod(vacationPeriod: VacationPeriod) : Observable<CreateVacationPeriodResponse>{
    // TODO: add validation

    return this.apiService
      .post<VacationPeriod, CreateVacationPeriodResponse>('/VacationPeriod', vacationPeriod)
      .pipe(map(data => data.result));
  }

  private ToShortDateAsString(date:Date):string{
    return formatDate(date, "yyyy/MM/dd", this.locale_id);
  }
}

