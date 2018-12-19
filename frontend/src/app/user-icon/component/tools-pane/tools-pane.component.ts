import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-tools-pane',
  templateUrl: './tools-pane.component.html',
  styleUrls: ['./tools-pane.component.scss']
})
export class ToolsPaneComponent implements OnInit {

  @Output('onToolSelected') selectEmitter: EventEmitter<string> = new EventEmitter<string>();

  selected = 'upload';

  @Input('imagesCount') imagesCount: number;


  constructor() {
  }

  ngOnInit() {
  }

  onToolSelect(toolName: string) {
    this.selected = toolName;
    this.selectEmitter.emit(this.selected);
  }

}
