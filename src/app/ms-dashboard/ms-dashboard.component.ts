import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-ms-dashboard',
  templateUrl: './ms-dashboard.component.html',
  styleUrls: ['./ms-dashboard.component.css'],
})
export class MsDashboardComponent {
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebarOnMobile() {
    if (window.innerWidth < 1024) {
      this.isSidebarOpen = false;
    }
  }

  // Auto close sidebar on resize to desktop
  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth >= 1024) {
      this.isSidebarOpen = false;
    }
  }
}
