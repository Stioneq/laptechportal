import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToastService} from '../../service/toast.service';
import {Message, MessageType} from '../../model/message';
import {animate, query, style, transition, trigger} from '@angular/animations';
import {delay, tap} from 'rxjs/operators';
import {DEFAULT_CONFIG} from '../../model/config';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('animation', [

      transition(':increment', [
        query('.message-box', style({transform: 'translateY(100%)'})),
        query('.message-box', animate('300ms ease', style({transform: 'translateY(0)'}))),
      ]),
      transition(':decrement', [
        query('.message-box', style({transform: 'translateY(0)'})),
        query('.message-box', animate('300ms ease', style({transform: 'translateY(100%)'})))
      ])
    ])]

})

export class ToastComponent implements OnInit, OnDestroy {
  //TODO need to rewrite by using dynamic components, currently it is a ugly solution
  private toastConfig = DEFAULT_CONFIG;
  messages: Message[] = [];
  private msgSubscription;
  MSG_TYPE = MessageType;

  constructor(private toastService: ToastService) {
  }

  ngOnInit() {
    this.msgSubscription = this.toastService.msgSubject$().pipe(tap(res => {
      this.messages.unshift(res);
    }), delay(this.toastConfig.toastDuration)).subscribe(res => {
      const index = this.messages.indexOf(res);
      if (index !== -1) {
        this.hide(index);
      }
    });
  }

  ngOnDestroy(): void {
    this.msgSubscription.unsubscribe();
  }


  hide(index: number) {
    this.messages.splice(index, 1);
  }


}
