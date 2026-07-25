import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
})
export class Profile implements OnInit {
  private http = inject(HttpClient);

  user: any = null;
  loading = true;

  ngOnInit() {
    const currentUser = localStorage.getItem('user');

    if (!currentUser) {
      this.loading = false;
      return;
    }

    const user = JSON.parse(currentUser);

    this.http
      .get<any>(`${environment.apiUrl}/users/${user.id}`)
      .subscribe({
        next: (res) => {
          this.user = res;
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        },
      });
  }

  signOut() {
    localStorage.removeItem('user');
    location.href = '/signin';
  }
}