import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appEditColor]',
  standalone: true
})
export class EditColorDirective {
  private color = 'inherit'

  @HostBinding('style.backgroundColor')
  get backgroundColor() {
    return this.color
  }

  @HostListener('mouseenter')
  mouseEnter() {
    this.color = '#f0ba4e'
  }

  @HostListener('mouseleave')
  mouseLeave() {
    this.color = 'inherit'
  }
}
