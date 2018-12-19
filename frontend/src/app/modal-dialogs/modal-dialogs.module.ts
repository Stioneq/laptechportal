import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModalService} from "./service/modal.service";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [ModalService],
  declarations: []
})
export class ModalDialogsModule { }
