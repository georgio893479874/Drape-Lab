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

  currentPage = 1;
  totalPages = 1;
  limit = 12;

  pages: number[] = [];


  ngOnInit() {
    this.loadProducts();
  }


  loadProducts(page: number = 1) {
    
    this.loading = true;

    this.http.get<any>(
      `${environment.apiUrl}/products?page=${page}&limit=${this.limit}`
    )
    .subscribe({
      next: (res) => {

        this.products = res.data;

        this.currentPage = res.page;
        this.totalPages = res.pages;

        this.pages = Array.from(
          { length: this.totalPages },
          (_, i) => i + 1
        );

        this.loading = false;
      },

      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }
}
