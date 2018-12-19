import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective {
  @Output() onscroll: EventEmitter<any> = new EventEmitter<any>();
  @HostListener('scroll', ['$event'])
  onScroll($event){
    this.onscroll.emit($event);
  }
  constructor() { }

}
