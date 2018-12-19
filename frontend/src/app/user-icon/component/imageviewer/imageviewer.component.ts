import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {animate, group, query, stagger, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-imageviewer',
  templateUrl: './imageviewer.component.html',
  styleUrls: ['./imageviewer.component.scss'],
  animations: [
    trigger('imageAnimation', [
      transition(':enter', [
        group([
          style({left: '{{ startX }}', top: '{{startY}}', width: '64px', height: '64px', opacity: 0})
        ]),
        group(
          [animate('500ms ease', style({left: '0', top: '0', width: '256px', height: '256px'}))
          ])]),
      transition(':leave', [
        group([
          animate('500ms ease', style({left: '{{ startX }}', top: '{{startY}}', width: '64px', height: '64px'}))
        ]),
      ])
    ])
  ]
})
export class ImageviewerComponent implements OnInit, OnDestroy {
  imagesPlaceholders = Array(3 * 3).fill(0);
  @Input('images') images;
  count = 3;
  private test;
  @Output('selected') selected = new EventEmitter<any>();

  selectedImage: any = {display: false, x: 0, y: 0};

  constructor() {
  }
  ngOnDestroy(){
    this.selected.emit(null);
  }
  ngOnInit() {
  }


  imgSelected(event) {
    this.selectedImage = {
      y: event.target.offsetTop + 'px',
      x: event.target.offsetLeft + 'px',
      display: true,
      src: event.target.src
    };
    this.selected.emit(event.target.src);
  }

  closeImage() {
    this.selectedImage.display = false;
    this.selected.emit(null);
  }

  test2() {
    this.test++;
  }
}
