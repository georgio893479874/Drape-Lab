import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { Sidebar } from './components/sidebar/sidebar';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [CommonModule, Header, Footer, RouterOutlet, Sidebar],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  sidebarOpen = false;
  showSidebar = false;

  openSidebar() {
    this.sidebarOpen = true;
  }

  closeSidebar() {
    this.sidebarOpen = false;
  }

  constructor(private router: Router) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      const hiddenRoutes = ['/signin', '/signup', '/', '/gallery'];

      this.showSidebar = !hiddenRoutes.includes(this.router.url);
    });
  }
}
