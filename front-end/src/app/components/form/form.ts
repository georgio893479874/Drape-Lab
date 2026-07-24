import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form.html',
})
export class Form {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private router = inject(Router);

  password = '';
  firstName = '';
  lastName = '';
  email = '';

  @Input() mode: 'signin' | 'signup' = 'signin';

  onSubmit() {
    if (this.isSignup) {
      this.http
        .post<any>(`${environment.apiUrl}/users`, {
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
        })
        .subscribe({
          next: (response) => {
            console.log('User created:', response);
          },
          error: (error) => {
            console.error('Error posting data:', error);
          },
        });
    } else {
      this.http
        .post<any>(`${environment.apiUrl}/auth/login`, {
          password: this.password,
          email: this.email,
        })
        .subscribe({
          next: (response) => {
            this.auth.login(response.user);
            this.router.navigate(['/main']);
            console.log('Login successful:', response);
          },
          error: (error) => {
            console.error('Error posting data:', error);
          },
        });
    }
  }

  get isSignup() {
    return this.mode === 'signup';
  }
}
