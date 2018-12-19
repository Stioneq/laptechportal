import {Component, OnInit} from '@angular/core';
import {animate, group, query, style, transition, trigger} from '@angular/animations';
import {ModalService} from '../modal-dialogs/service/modal.service';
import {SIDE_FILTER_PANEL_ID} from './component/side-filter-panel/side-filter-panel.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-question-container',
  templateUrl: './question-container.component.html',
  styleUrls: ['./question-container.component.scss'],
  animations: [
    trigger('navigationAnimation', [
      transition(':enter', [
        group([
          style({transform: 'translateY(-50%) scaleY(0)', opacity: 0}),
          query('*', style({opacity: 0}))
        ]),
        group(
          [animate('1000ms ease', style('*')),
            query('*', [
              animate(500, style('*'))
            ])])
      ])
    ])]
})
export class QuestionContainerComponent implements OnInit {
  constructor(private modalService: ModalService, public router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
  }
  isQuestionListUrl(): boolean {
    return this.activatedRoute.firstChild.snapshot.url.join() === '';
  }

  showFilters(): void {
    this.modalService.showModal(SIDE_FILTER_PANEL_ID);
  }

}
