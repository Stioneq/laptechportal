import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem} from './menu-item';
import {UserService} from '../../user/service/user.service';
import {map} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {ModalDialog} from '../../modal-dialogs/model/modal-dialog';
import {ModalService} from '../../modal-dialogs/service/modal.service';
import {ProgressRegistryService} from 'ngx-rxprogress';


@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit, OnDestroy, ModalDialog {

  userRoles: string[] = [];
  items: MenuItem[] = [
    {title: 'Blog', link: 'blog'},
    {title: 'Dashboard', link: 'dashboard'},
    {title: 'Interview questions', link: 'questions'},
    {title: 'Interview', link: 'interview', roles: ['ADMIN', 'INTERVIEWER']},
    {title: 'Charts', link: 'charts'}
  ];
  menuToggled: boolean;
  filteredItems: MenuItem[] = [];
  rolesUpdateSubscription: Subscription;
  roleChecker: (menuItem) => boolean = menuItem => {
    return !menuItem.roles || menuItem.roles
      .filter(role => this.userRoles.indexOf(role) !== -1).length > 0;
  }


  constructor(private userService: UserService, progressRegistryService: ProgressRegistryService, private modalService: ModalService) {
    this.filteredItems = this.items.filter(this.roleChecker);
  }

  ngOnInit() {
    this.rolesUpdateSubscription = this.userService.getUser$().pipe(map(u => u && u.roles || [])).subscribe(roles => {
      this.userRoles = roles;
      this.filteredItems = this.items.filter(this.roleChecker);
    });
  }

  ngOnDestroy(): void {
    this.rolesUpdateSubscription.unsubscribe();
  }

  toggleMenu() {
    if (this.menuToggled) {
      this.close();
    } else {
      this.modalService.registerModal(this);
      this.menuToggled = true;
    }
  }

  close(): void {
    this.modalService.closeModalDialog(this);
    this.menuToggled = false;
  }


}
