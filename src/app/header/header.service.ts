import { Injectable } from '@angular/core';
import { NbSidebarService } from  

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  constructor(private NbSidebarService: NbSidebarService) {}

  toggleSidebar() {
    this.NbSidebarService.toggle(false, 'left');
  }
}
