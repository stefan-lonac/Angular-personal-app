import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperatureClass',
  standalone: true,
})
export class TemperaturePipeClass implements PipeTransform {
  transform(temperature: number): any {
    return temperature > 20 ? 'its-too-hot' : 'its-nice';
  }
}
