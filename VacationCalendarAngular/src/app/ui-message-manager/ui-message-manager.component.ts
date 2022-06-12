import { Component, OnInit } from '@angular/core';
import { UiMessageModel } from '../models/ui-message-model';
import { UiMessageService } from '../services/ui-message-service.service';

@Component({
  selector: 'app-ui-message-manager',
  templateUrl: './ui-message-manager.component.html',
  styleUrls: ['./ui-message-manager.component.less']
})
export class UiMessageManagerComponent implements OnInit {
  messages: Array<UiMessageModel>= new Array<UiMessageModel>();

  constructor(private uiMessageService: UiMessageService) {}

  ngOnInit(): void {
    this.uiMessageService.getObservable().subscribe(messages => this.messages = messages);
  }

  public removeMessage(idx: number){
    this.uiMessageService.removeMessage(idx);
  }
}

