import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UiMessageModel } from '../models/ui-message-model';

@Injectable({
  providedIn: 'root'
})
export class UiMessageService{
  private messages: Array<UiMessageModel> = new Array<UiMessageModel>();
  private messageSource = new BehaviorSubject<Array<UiMessageModel>>([]);

  constructor(){}

  getObservable(): Observable<Array<UiMessageModel>>{
    return this.messageSource.asObservable();
  }

  addMessage(uiMessage: UiMessageModel){
    if (!uiMessage) return;
    this.messages.push(uiMessage);
    this.messageSource.next(this.messages);
  }

  clearMessages() {
    this.messages = [];
    this.messageSource.next(this.messages);
  }
}
