import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Weather } from '../weather/weather.model';

import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ThemeSwitcherComponent } from '../shared/components/theme-switcher/theme-switcher.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatMenuModule,
    CommonModule,
    RouterModule,
    ThemeSwitcherComponent,
    MatCardModule,
  ],
})
export class HeaderComponent {
  weatherDataHeader?: Weather;
  weatherDataCurrent: Observable<Weather>;
  gamesItems = [{ title: 'Hangman' }, { title: 'Quiz' }];

  constructor(private router: Router) {
    const weatherGet = JSON.parse(localStorage.getItem('weather')!);
    this.weatherDataHeader = { ...weatherGet };
  }
}
