import {Component, Input, OnInit} from '@angular/core';
import {animate, group, keyframes, query, stagger, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  animations: [
    trigger('bubbleAnimation', [
      transition(':enter', [
          style({'transform': 'translate(50%, -50%) scale(0)'}),
          animate('500ms ease', style({'transform': 'translate(50%, -50%) scale(1)'})),
        ]
      ),
      transition(':leave', [
          style({'opacity': 0}),
          animate('500ms linear', style({'opacity': 1})),
        ]
      ),
      transition(':increment', [
          style('*'),
          animate('500ms ease',
            keyframes([
              style({'transform': 'translate(50%, -50%) scale(0)'}),
              style({'transform': 'translate(50%, -50%) scale(1)'}),
            ])),
        ]
      ),
      transition(':decrement', [
          style('*'),
          animate('500ms ease',
            keyframes([
              style({'transform': 'translate(50%, -50%) scale(0)'}),
              style({'transform': 'translate(50%, -50%) scale(1)'}),
            ])),
        ]
      )])
  ]
})

export class IconComponent implements OnInit {
  @Input('data') data;
  @Input('material') isMaterial = false;
  @Input('style') style = {};
  @Input() bubbleCount = 0;

  constructor() {

  }

  ngOnInit() {
  }

}
