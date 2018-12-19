import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {animate, group, query, style, transition, trigger} from '@angular/animations';
import {ModalDialog} from '../../../modal-dialogs/model/modal-dialog';
import {ModalService} from '../../../modal-dialogs/service/modal.service';

@Component({
  selector: 'app-change-icon',
  templateUrl: './change-icon.component.html',
  styleUrls: ['./change-icon.component.scss'],
  animations: [
    trigger('slider', [
      transition(':increment', group([
        query(':enter', [
          style({
            left: '100%'
          }),
          animate('0.5s ease-out', style('*'))
        ]),
        query(':leave', [
          animate('0.5s ease-out', style({
            left: '-100%'
          }))
        ])
      ])),
      transition(':decrement', group([
        query(':enter', [
          style({
            left: '-100%'
          }),
          animate('0.5s ease-out', style('*'))
        ]),
        query(':leave', [
          animate('0.5s ease-out', style({
            left: '100%'
          }))
        ])
      ]))
    ])
  ]
})
export class ChangeIconComponent implements OnInit, ModalDialog {

  @Output('onImageUpload') uploadEmitter: EventEmitter<File> = new EventEmitter<File>();
  @Output('hide') hideEmitter: EventEmitter<void> = new EventEmitter<void>();

  private tools = ['upload', 'camera', 'view'];
  image: any;
  currentMode = 'upload';

  photos: any[] = [];
  selectedIndex = 0;
  newPhotos = 0;


  constructor(private modalService: ModalService) {
  }

  ngOnInit() {
    this.modalService.registerModal(this);
  }

  uploadImage() {
    this.uploadEmitter.emit(this.image);
    this.close();
  }

  toolSelected($event) {
    this.currentMode = $event;
    this.selectedIndex = this.tools.indexOf(this.currentMode);
    if(this.currentMode === 'view') {
      this.newPhotos = 0;
    }
    console.log(this.selectedIndex);
  }

  storePhoto(event: any) {
    this.photos.push(event);
    this.newPhotos++;
  }

  close(): void {
    this.modalService.closeModalDialog(this);
    this.hideEmitter.emit();
  }
}
