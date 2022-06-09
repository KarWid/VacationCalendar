import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ApiResponse } from 'src/dtos/responses/api-response';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  apiUrl: string = 'https://localhost:4015/api'; // TODO move to config

  constructor(private httpClient: HttpClient) {}

  get<TResult>(path: string, params: HttpParams = new HttpParams()): Observable<ApiResponse<TResult>>{
    return this.httpClient
      .get<ApiResponse<TResult>>(`${this.apiUrl}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  post<TRequest, TResponse>(path: string, request: TRequest): Observable<ApiResponse<TResponse>> {
    return this.httpClient
      .post<ApiResponse<TResponse>>(`${this.apiUrl}${path}`, request)
      .pipe(catchError(this.formatErrors));
  }

  private formatErrors(error: any){
    debugger;
    return throwError(error.error);
  }
}
