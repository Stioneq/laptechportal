import {Inject, Injectable, Renderer2} from '@angular/core';
import {ModalDialog} from '../model/modal-dialog';
import {DOCUMENT} from '@angular/common';
import {BehaviorSubject, Observable, ReplaySubject, Subject} from 'rxjs/index';
import {filter, map, share, tap} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalStatuses: Subject<{ id: string, show: boolean }> = new ReplaySubject(10);
  private currentDialogs: ModalDialog[] = [];

  constructor(@Inject(DOCUMENT) private document: any) {
  }

  canRedirect() {
    return true;
  }


  /**
   * Register modal this will be used to allow or forbid route change
   * @param {ModalDialog} modal
   */
  registerModal(modal: ModalDialog) {
    this.document.body.classList.add('modal-open');
    this.currentDialogs.push(modal);
  }

  closeModalDialog(modal: ModalDialog) {
    const index = this.currentDialogs.indexOf(modal);
    this.currentDialogs.splice(index, 1);
    if (this.currentDialogs.length === 0) {
      this.document.body.classList.remove('modal-open');
    }
  }

  /**
   * used on route change
   */
  closeAllDialogs() {

    this.currentDialogs.forEach(dlg => {
      dlg.close();
      this.closeModalDialog(dlg);
    });


  }

  showModal(id) {
    this.modalStatuses.next({id: id, show: true});
  }

  hideModal(id) {
    this.modalStatuses.next({id: id, show: false});
  }

  showModal$(id: string): Observable<boolean> {
    return this.modalStatuses.asObservable()
      .pipe(
        tap(e => console.log()),
        map(modal => modal.show),
        share()
        );
  }
}
