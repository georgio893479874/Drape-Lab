import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { RouterOutlet, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { Sidebar } from './components/sidebar/sidebar';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, Header, Footer, RouterOutlet, Sidebar],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  sidebarOpen = false;
  showSidebar = false;
  private auth = inject(AuthService);

  openSidebar() { this.sidebarOpen = true; }
  closeSidebar() { this.sidebarOpen = false; }

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.auth.loadUser();
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe(() => {
      let route = this.activatedRoute.root;
      while (route.firstChild) {
        route = route.firstChild;
      }

      const hideSidebar = route.snapshot.data['hideSidebar'] === true;
      this.showSidebar = !hideSidebar; 
    });
  }
}
