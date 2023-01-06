import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss'],
})
export class ThemeSwitcherComponent implements OnInit {
  themeName?: string = 'default';
  constructor(private NbThemeService: NbThemeService) {}

  ngOnInit(): void {
    this.themeName = this.currentTheme;
    this.NbThemeService.changeTheme(this.currentTheme);
  }

  public get currentTheme(): any {
    return localStorage.getItem('theme')!;
  }

  public switchTheme() {
    if (this.themeName == 'default') {
      this.themeName = 'dark';
      localStorage.setItem('theme', this.themeName!);
      this.NbThemeService.changeTheme(this.currentTheme);
    } else {
      this.themeName = 'default';
      localStorage.setItem('theme', this.themeName!);
      this.NbThemeService.changeTheme(this.currentTheme);
    }
  }
}
