import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss']
})
export class WebcamComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('videoElement') video: ElementRef;

  loading = true;

  @ViewChild('canvas')
  public canvas: ElementRef;
  @Output('onPhoto') photoEmitter = new EventEmitter<any>();
  /**
   * Store the stream to stop it after component will be destroyed
   */
  private stream: MediaStream;

  ngAfterViewInit(): void {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

      navigator.mediaDevices.getUserMedia({video: {width: 256, height: 256}}).then(stream => {
        this.loading = false;
        this.video.nativeElement.src = window.URL.createObjectURL(stream);
        this.video.nativeElement.play();
        this.stream = stream;
      });
    }
  }

  ngOnDestroy(): void {
    this.stream.getVideoTracks()[0].stop();
  }

  constructor() {
  }

  ngOnInit() {
  }

  makePhoto() {
    const context = this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0, 256, 256);

    this.photoEmitter.emit(this.canvas.nativeElement.toDataURL('image/png'));
  }
}
