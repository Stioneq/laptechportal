import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tag} from '../../model/tag';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  @Input('data') data: Tag;
  @Output('hide') hideEmitter: EventEmitter<void> = new EventEmitter<void>();
  @Input('closable') closable = false;

  constructor() {
  }

  ngOnInit() {
  }

  onHide() {
    this.hideEmitter.emit();
  }
}
