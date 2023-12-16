import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ThemeSwitcherComponent implements OnInit {
  themeName: string = 'default';
  isDarkTheme: boolean = true;

  constructor() {}

  ngOnInit(): void {
    this.isDarkTheme = localStorage.getItem('theme') === 'Dark' ? true : false;
  }

  // public get currentTheme(): string {
  //   // return (this.themeName = localStorage.getItem('theme')!);
  // }

  public switchTheme() {
    if (this.isDarkTheme) {
      this.isDarkTheme = false;
      this.themeName = 'Dark';
      localStorage.setItem('theme', 'Dark');
    } else {
      this.isDarkTheme = true;
      this.themeName = 'Light';
      localStorage.setItem('theme', 'Light');
    }
  }
}
