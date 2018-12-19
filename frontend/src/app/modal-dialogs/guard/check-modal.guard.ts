import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild} from '@angular/router';
import {Observable} from 'rxjs';
import {ModalService} from '../service/modal.service';

@Injectable({
  providedIn: 'root'
})
export class CheckModalGuard implements CanActivateChild {

  constructor(private modalService: ModalService) {

  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.modalService.closeAllDialogs();
    return this.modalService.canRedirect();
  }
}
