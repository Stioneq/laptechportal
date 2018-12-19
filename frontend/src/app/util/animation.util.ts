import {animate, style, transition, trigger} from '@angular/animations';

export const COLLAPSE_ANIMATION = trigger('collapseAnimation', [
  transition(':enter', [
    style({transform: 'translateY(-50%) scaleY(0)', opacity: 0}),
    animate('1s ease', style('*'))
  ]),
  transition(':leave', [
    animate('1s ease', style({transform: 'translateY(-50%) scaleY(0)', opacity: 0}))
  ])
]);
