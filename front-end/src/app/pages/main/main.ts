import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main implements OnInit {

  private http = inject(HttpClient);

  products: any[] = [];
  loading = true;

  ngOnInit() {
    this.http.get<any>(`${environment.apiUrl}/products`)
      .subscribe({
        next: (res) => {
          this.products = res.data;
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
  }
}