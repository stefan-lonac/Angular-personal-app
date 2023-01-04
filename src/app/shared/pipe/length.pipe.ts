import { ElementRef, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'length',
})
export class LengthPipe implements PipeTransform {
  constructor(private el: ElementRef) {}

  transform(value: string, max: number): any {
    const parent = this.el.nativeElement.parentNode;
    if (value.length > 20) {
      parent.style.color = 'red';
    } else {
      parent.style.color = '';
    }
    return value.length + '/' + max;
  }
}
