import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  @ViewChild('canvas')
  public canvas: ElementRef;

  @Output('onImageUploaded')
  imageEmitter = new EventEmitter<any>();

  fileList: FileList;
  preview: any;
  progress: number;
  progressShow: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  onImageChange(files: FileList) {
    this.fileList = files;
    if (!files || files.length === 0) {
      this.preview = null;
    } else {
      this.preview = true;
      const file = files.item(0);
      const fileReader = new FileReader();
      fileReader.onloadstart = (e) => {
        this.progress = 0;
        this.progressShow = true;
      };
      fileReader.onload = (e) => {

        const image = new Image();
        image.onload = () => {

          this.canvas.nativeElement.getContext('2d').drawImage(image, 0, 0, image.width, image.height, 0, 0, 256, 256);
          this.canvas.nativeElement.toBlob((blob) => {
            this.imageEmitter.emit(blob);
          });

          this.progressShow = false;
        };
        image.src = (<any>e.target).result;
      };
      fileReader.onprogress = (e) => {
        this.progress = Math.round((e.loaded / e.total) * 100);
      };
      fileReader.readAsDataURL(file);
    }
  }
}
