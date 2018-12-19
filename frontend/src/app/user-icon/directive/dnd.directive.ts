import {Directive, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';

@Directive({
  selector: '[appDnd]'
})
export class DndDirective {
  @HostBinding('class.drag-success') dragging: boolean;
  @HostBinding('class.incorrect-drag') errorDragging: boolean;

  @Input('allowedFormats') allowedFormats: String[] = [];
  @Output('imageDrag') dragFileEmitter: EventEmitter<FileList> = new EventEmitter<FileList>();

  @HostListener('dragover') onDragOver() {
    console.log('over');
    return false;
  }

  @HostListener('dragenter', ['$event']) handleDragEnter(e: DragEvent) {
    event.preventDefault();
    if (this.validateInputFormat(e)) {
      this.dragging = true;
      this.errorDragging = false;
    } else {
      this.errorDragging = true;
      return false;
    }
  }

  @HostListener('dragleave', ['$event']) handleDragLeave(event) {
    this.dragging = false;
    event.preventDefault();
    this.errorDragging = false;
  }

  @HostListener('drop', ['$event']) handleDrop(e: any) {
    e.preventDefault();
    if (!this.errorDragging) {
      this.dragFileEmitter.emit(e.dataTransfer.files);
    }
    this.dragging = false;

  }

  OnInit() {
    console.log('initialized');
  }

  private validateInputFormat(e: any) {
    const items = e.dataTransfer.items;
    return items.length === 1 && items[0].kind === 'file'
      && (this.allowedFormats.length === 0 || this.allowedFormats.indexOf(items[0].type) !== -1);
  }
}
