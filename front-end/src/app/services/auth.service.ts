import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  user = signal<any>(null);

  login(user: any) {
    this.user.set(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    this.user.set(null);
    localStorage.removeItem('user');
  }

  isAuthenticated() {
    return !!this.user();
  }

  loadUser() {
    const user = localStorage.getItem('user');

    if (user) {
      this.user.set(JSON.parse(user));
    }
  }
}