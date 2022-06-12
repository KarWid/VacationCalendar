import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { ApiService } from './api.service';
import { catchError, EMPTY, map, Observable, throwError } from 'rxjs';
import { formatDate } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { GetVacationPeriodsByDatesResponse } from 'src/app/dtos/responses/get-vacation-periods-by-dates-response';
import { VacationPeriod } from 'src/app/models/vacation-period';
import { CreateVacationPeriodResponse } from 'src/app/dtos/responses/create-vacation-period-response';

@Injectable({
  providedIn: 'root'
})

export class VacationPeriodService {
  constructor(
    private apiService: ApiService,
    @Inject(LOCALE_ID) private locale_id: string) { }

  /**
   * Gets all vacation periods defined in date range from 'from' to 'to' from the API.
   * @param from From date.
   * @param to To Date
   * @returns All vacation periods for requested date range.
   */  
  public getVacationPeriodsByDates(from: Date, to: Date) : Observable<GetVacationPeriodsByDatesResponse>  {
    let httpParams = new HttpParams()
      .append("from", this.ToShortDateAsString(from))
      .append("to", this.ToShortDateAsString(to));
      
    return this.apiService
      .get<GetVacationPeriodsByDatesResponse>('/VacationPeriod', httpParams)
      .pipe(map(data => new GetVacationPeriodsByDatesResponse(data.result.vacationPeriods)));
  }

  /**
   * Sends a request to the API to create a vacation period for a user.
   * @param vacationPeriod New vacation period.
   * @returns Newly created vacation period with properties like id, userId.
   */
  public addVacationPeriod(vacationPeriod: VacationPeriod) : Observable<CreateVacationPeriodResponse>{
    return this.apiService
      .post<VacationPeriod, CreateVacationPeriodResponse>('/VacationPeriod', vacationPeriod)
      .pipe(map(data => data.result));
  }

  /**
   * 
   * @param date Date.
   * @returns Date as short date in string format "yyyy/MM/dd" based on locale_id.
   */
  private ToShortDateAsString(date:Date):string{
    return formatDate(date, "yyyy/MM/dd", this.locale_id);
  }
}

