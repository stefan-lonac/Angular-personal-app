import { Component } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { Weather } from '../weather/weather.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  weatherDataHeader?: Weather;
  weatherDataCurrent: Observable<Weather>;

  constructor(private sidebarService: NbSidebarService) {
    const weatherGet = JSON.parse(localStorage.getItem('weather')!);
    this.weatherDataHeader = { ...weatherGet };
  }

  toggleSidebar() {
    this.sidebarService.toggle(false, 'left');
  }
}
