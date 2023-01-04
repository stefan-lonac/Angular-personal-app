import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyText',
})
export class EmptyTextPipe implements PipeTransform {
  transform(value: string): any {
    if (value === null || value === undefined || value === '') {
      return '/';
    }
    return value;
  }
}
