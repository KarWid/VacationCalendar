export class UiMessageModel{
    constructor(public message:string, public type: UiMessageType){}
  }
  
  export enum UiMessageType{
    Success = 'Success',
    Error = 'Error',
    Warning = 'Warning'
  }
