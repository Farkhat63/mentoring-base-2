import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appEditBoxShadow]',
  standalone: true
})
export class EditBoxShadowDirective {
 private value = 'none'

  @HostBinding('style.boxShadow')
  get valueGetter() {
    return this.value
  }

  @HostListener('mouseenter')
  mouseEnter() {
    this.value = '0 4px 8px rgba(0, 0, 0, 0.3)'
  }

  @HostListener('mouseleave')
  mouseLeave() {
    this.value = 'none'
  }
}
