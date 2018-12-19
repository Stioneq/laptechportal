import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../auth/service/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {animate, group, query, style, transition, trigger} from '@angular/animations';
import {UserService} from '../../service/user.service';
import {switchMap} from 'rxjs/operators';
import {Location} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
    ]),
    trigger('errorAnimation', [
      transition(':enter', [
        style({transform: 'translateY(-50%) scaleY(0)', opacity: 0}),
        animate('1s ease', style('*'))
      ]),
      transition(':leave', [
        animate('1s ease', style({transform: 'translateY(-50%) scaleY(0)', opacity: 0}))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {
  @Input('visible') visible = false;
  @Output('hide') hide: EventEmitter<void> = new EventEmitter<void>();
  form: FormGroup;
  showPassword: boolean;
  error = '';

  constructor(private userService: UserService,
              private authService: AuthService,
              private fb: FormBuilder) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }


  hidePopup() {
    this.visible = false;
    this.hide.emit();
  }

  login() {
    this.authService.login(this.form.value).pipe(switchMap(() => this.userService.requestUser())).subscribe((u) => {
      this.resetForm();
      this.hidePopup();
    }, () => {
      this.error = 'The username or password is incorrect';
    });
  }

  private resetForm() {
    this.form.reset();
    this.error = '';
  }

  socialLogin() {
    window.open('https://github.com/login/oauth/authorize?client_id=815f089f3b53250a3170&' +
      'redirect_uri=http://localhost:4200/login');
  }
}
