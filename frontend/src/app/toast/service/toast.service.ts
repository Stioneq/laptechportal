import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Message, MessageType} from '../model/message';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private msgSubject: Subject<Message> = new Subject<Message>();


  constructor() {
  }

  msgSubject$(): Observable<Message> {
    return this.msgSubject.asObservable();
  }

  sendInfoMessage(title: string, text: string) {
    return this.msgSubject.next({...this.createMessage(title, text), messageType: MessageType.INFO});
  }

  sendSuccessMessage(title: string, text: string) {
    return this.msgSubject.next({...this.createMessage(title, text), messageType: MessageType.SUCCESS});
  }

  private createMessage(title: string, text: string) {
    return {title: title, text: text, messageType: MessageType.INFO};
  }

  sendErrorMessage(title: string, text: string) {
    return this.msgSubject.next({...this.createMessage(title, text), messageType: MessageType.ERR});
  }
}
