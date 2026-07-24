import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, effect, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductFilters, ProductFilterService } from '../../services/product-filter.service';

@Component({
  selector: 'app-main',
  imports: [CommonModule, RouterLink],
  standalone: true,
  templateUrl: './main.html',
})
export class Main {
  private http = inject(HttpClient);
  private filters = inject(ProductFilterService);

  products: any[] = [];
  loading = true;
  currentPage = 1;
  totalPages = 1;
  limit = 12;
  pages: number[] = [];

  constructor() {
    effect(() => {
      this.loadProducts(1, this.filters.filters());
    });
  }

  loadProducts(page: number = 1, filters: ProductFilters = this.filters.filters()) {
    this.loading = true;

    let params = new HttpParams().set('page', page).set('limit', this.limit);

    if (filters.categoryId) {
      params = params.set('categoryId', filters.categoryId);
    }

    if (filters.search) {
      params = params.set('search', filters.search);
    }

    if (filters.maxPrice) {
      params = params.set('maxPrice', filters.maxPrice);
    }

    if (filters.color) {
      params = params.set('color', filters.color);
    }

    if (filters.size) {
      params = params.set('size', filters.size);
    }


    this.http
      .get<any>(`${environment.apiUrl}/products`, {
        params,
      })
      .subscribe({
        next: (res) => {
          this.products = res.data;
          this.currentPage = res.page;
          this.totalPages = res.pages;
          this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        },
      });
  }
}
