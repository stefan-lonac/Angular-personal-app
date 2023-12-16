import { ElementRef, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'disableBtn',
  standalone: true,
})
export class DisableButton implements PipeTransform {
  constructor(private el: ElementRef) {}

  transform(value: string): boolean {
    const buttonEl = this.el.nativeElement.parentNode;
    if (value === '' || value.length < 3 || value.length > 20) {
      return true;
    }
    return false;
  }
}
