import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, EMPTY, EmptyError, Observable, of, throwError } from 'rxjs';
import { UiMessageService } from '../services/ui-message-service.service';
import { UiMessageModel, UiMessageType } from '../models/ui-message-model';
import { ApiResponse, ApiResponseStatus } from '../dtos/responses/api-response';

@Injectable()
export class HandleErrorMessageInterceptor implements HttpInterceptor {

  constructor(private uiMessageService: UiMessageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError((error) => {
          this.uiMessageService.clearMessages(); // TODO: move it to another place probably
          if (error?.error?.Status === undefined){
            return of(error);
          }

          var apiResponse = new ApiResponse<any>(error.error);
          // TODO: Maybe handle that in another way to not display these errors on the top of the page
          // if (apiResponse.status === ApiResponseStatus.Validation){
          //   return of(apiResponse); // handle validation errors in the correct 'window'
          // }

          apiResponse.errors.forEach(message => this.uiMessageService.addMessage(new UiMessageModel(message, UiMessageType.Error)));
          return EMPTY;
        })
      );
  }
}
