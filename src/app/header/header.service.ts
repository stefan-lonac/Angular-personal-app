import { Injectable } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  constructor(private NbSidebarService: NbSidebarService) {}

  toggleSidebar() {
    this.NbSidebarService.toggle(false, 'left');
  }
}
