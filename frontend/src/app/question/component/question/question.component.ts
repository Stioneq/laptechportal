import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {QuestionPreview} from '../../model/question-preview';
import {animate, group, query, stagger, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  animations: [
    trigger('flipAnimation', [
      transition('* <=> *', [
          style({'transform': 'rotateY(180deg)', 'opacity': 0}),
          animate('500ms linear', style({'transform': 'rotateY(0)', 'opacity': 1})),
        ]
      )])
  ]
})

export class QuestionComponent {

  @Input() data: QuestionPreview;
  @Input() editable: boolean;
  @Input() showRatingChange: boolean;
  @Output('remove') remove: EventEmitter<void> = new EventEmitter<void>();
  @Output('ratingChanged') ratingChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output('edit') edit: EventEmitter<void> = new EventEmitter<void>();

  getIcon() {
    return this.data && this.data.icon || './assets/img/user_icon.png';
  }
}
