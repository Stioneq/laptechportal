import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../model/user';
import {MenuItem} from './menu-item';
import {AuthService} from '../../../auth/service/auth.service';
import {animate, group, query, style, transition, trigger} from '@angular/animations';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  animations: [
    trigger('popupAnimation', [
      transition(':enter', [
        group([
          style({transform: 'translateY(-50%) scaleY(0)', opacity: 0}),
          query('*', style({opacity: 0}))
        ]),
        group(
          [animate('500ms ease', style('*')),
            query('*', [
              animate(500, style('*'))
            ])])
      ]),
      transition(':leave', [
        group([
          animate('500ms ease', style({transform: 'translateY(-50%) scaleY(0)', opacity: 0})),
          query('*', [
            animate(500, style('*'))
          ])]),
      ])
    ])
  ]
})
export class UserMenuComponent implements OnInit {
  @Input('visible') visible = false;
  @Input('user') user: User;
  @Output('hide') hide: EventEmitter<void> = new EventEmitter<void>();
  @Output('uploadIconDialogClicked') uploadIconDialogClicked: EventEmitter<void> = new EventEmitter<void>();

  menuItems: MenuItem[] = [
    {title: this.user && this.user.username, action: () => 2},
    {title: 'My Profile', action: () => console.log(3)},
    {title: 'Logout', action: () => this.authService.logout()},

  ];
  showImageUpload: boolean;

  constructor(private authService: AuthService, private userService: UserService) {
  }

  ngOnInit() {

  }

  logout() {
    this.userService.setUser(null);
    this.authService.logout();
    this.hidePopup();
  }

  hidePopup() {
    this.showImageUpload = false;
    this.visible = false;
    this.hide.emit(null);
  }

}
