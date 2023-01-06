import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Weather } from '../weather/weather.model';
import { HeaderService } from './header.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  weatherDataHeader?: Weather;
  weatherDataCurrent: Observable<Weather>;

  constructor(public headerService: HeaderService) {
    const weatherGet = JSON.parse(localStorage.getItem('weather')!);
    this.weatherDataHeader = { ...weatherGet };
  }
}
