import {NgModule} from '@angular/core';
import {ChangeIconComponent} from './component/change-icon-dialog/change-icon.component';
import {UploadImageComponent} from './component/upload-image/upload-image.component';
import {WebcamComponent} from './component/webcam/webcam.component';
import {ImageviewerComponent} from './component/imageviewer/imageviewer.component';
import {ToolsPaneComponent} from './component/tools-pane/tools-pane.component';
import {DndDirective} from './directive/dnd.directive';
import {IconModule} from '../icon/icon.module';
import {CoreModule} from '../core/core.module';

@NgModule({
  imports: [
    CoreModule,
    IconModule
  ],
  exports: [ChangeIconComponent],
  declarations: [ChangeIconComponent, UploadImageComponent, WebcamComponent, ImageviewerComponent, ToolsPaneComponent
    , DndDirective]
})
export class UserIconModule {
}
