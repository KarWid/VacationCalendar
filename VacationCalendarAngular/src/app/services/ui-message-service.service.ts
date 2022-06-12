import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UiMessageModel, UiMessageType } from '../models/ui-message-model';

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

  /**
  * Remove a message from the list by its index(position)
  * idx
  */
  removeMessage(idx: number) {
    this.messages.splice(idx, 1);
  }

  clearMessages() {
    this.messages = [];
    this.messageSource.next(this.messages);
  }
}
