import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuService, NB_WINDOW } from '@nebular/theme';
import { filter, map, Observable } from 'rxjs';
import { Weather } from '../weather/weather.model';
import { HeaderService } from './header.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  weatherDataHeader?: Weather;
  weatherDataCurrent: Observable<Weather>;
  gamesItems = [
    {
      title: 'Hangman',
    },
  ];

  constructor(
    public headerService: HeaderService,
    private nbMenuService: NbMenuService,
    private router: Router
  ) {
    const weatherGet = JSON.parse(localStorage.getItem('weather')!);
    this.weatherDataHeader = { ...weatherGet };
  }

  ngOnInit(): void {
    this.nbMenuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'gamesItems'),
        map(({ item: { title } }) => title.toLocaleLowerCase())
      )
      .subscribe((title) => {
        this.router.navigate([`${title}`]);
      });
  }
}
