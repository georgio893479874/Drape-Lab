import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  heroArrowLeftOnRectangle,
  heroUserPlus,
  heroBars3,
  heroShoppingBag,
  heroUserCircle,
  heroHeart,
  heroMagnifyingGlass,
} from '@ng-icons/heroicons/outline';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  imports: [CommonModule, NgIcon, RouterLink],
  providers: [
    provideIcons({
      heroArrowLeftOnRectangle,
      heroUserPlus,
      heroBars3,
      heroShoppingBag,
      heroUserCircle,
      heroHeart,
      heroMagnifyingGlass,
    }),
  ],
})
export class Header {
  private auth = inject(AuthService);
  private router = inject(Router);
  @Input() showMenuButton = false;
  @Output() menuClick = new EventEmitter<void>();

  get isLoggedIn() {
    return this.auth.isAuthenticated();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/signin']);
  }
}
