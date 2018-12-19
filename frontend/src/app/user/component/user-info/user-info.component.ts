import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {User} from '../../model/user';
import {Subscription} from 'rxjs';
import {ImageUploadService} from '../../service/image-upload.service';
import {ToastService} from '../../../toast/service/toast.service';
import {ModalService} from '../../../modal-dialogs/service/modal.service';
import {ModalDialog} from '../../../modal-dialogs/model/modal-dialog';
import {ProgressRegistryService} from 'ngx-rxprogress';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],

})
export class UserInfoComponent implements OnInit, OnDestroy, ModalDialog {

  user: User;
  private userSubscription: Subscription;
  isPopupVisible: boolean;
  isShowLogin: boolean;
  showImageUpload: boolean;
  userLoadProgressId = 'user-load-progress';

  constructor(public userService: UserService, private imageUploadService: ImageUploadService, private toastService: ToastService,
              private progressRegistry: ProgressRegistryService, private modalService: ModalService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    if (this.userService.isAuthenticated()) {
      this.progressRegistry.register(this.userLoadProgressId, this.userService.requestUser()).subscribe(u => console.log('request user'));
    }
    this.userSubscription = this.userService.getUser$().subscribe((u) => {
      this.user = u;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }


  showPopup() {
    this.modalService.registerModal(this);
    this.isPopupVisible = true;
  }

  showLogin() {
    this.modalService.registerModal(this);
    this.isShowLogin = true;
  }


  onImageUpload(icon: any) {
    this.imageUploadService.uploadUserIcon(icon).subscribe(() => {
      this.toastService.sendInfoMessage('Success', 'Icon was successfully uploaded');
      icon = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(icon));
      this.userService.setUser(Object.assign({}, this.user, {icon}));
    });
  }

  close() {
    this.modalService.closeModalDialog(this);
    this.isPopupVisible = false;
    this.isShowLogin = false;
    this.showImageUpload = false;
  }

}
