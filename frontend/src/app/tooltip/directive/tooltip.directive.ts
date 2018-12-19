import {Directive, ElementRef, HostBinding, HostListener, Input, Renderer, Renderer2} from '@angular/core';

/**
 * In order to style tooltip you need to add class .tooltip into your style file
 */
@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  private tooltip: any;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {

  }

  @Input('tooltipText') tooltipText = '';

  @HostListener('mouseover', ['$event']) onMouseOver(event) {
    const tooltip = this.tooltip = this.renderer.createElement('div');
    const text = this.renderer.createText(this.tooltipText);
    this.renderer.appendChild(tooltip, text);
    this.renderer.insertBefore(this.elRef.nativeElement.parentNode, tooltip, this.elRef.nativeElement);

    this.renderer.addClass(this.tooltip, 'tooltip');
    this.renderer.setStyle(this.tooltip, 'left', event.target.offsetLeft + event.target.offsetWidth / 2 + 'px');
    this.renderer.setStyle(this.tooltip, 'top', event.target.offsetTop + event.target.offsetHeight + 'px');
  }

  @HostListener('mouseout') onMouseOut() {
    this.renderer.removeChild(this.elRef.nativeElement.parentNode, this.tooltip);
  }


}
