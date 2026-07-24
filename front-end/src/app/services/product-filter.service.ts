import { Injectable, signal } from '@angular/core';

export interface ProductFilters {
  search?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  color?: string;
  size?: string;
  sort?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductFilterService {
  filters = signal<ProductFilters>({});

  update(filters: Partial<ProductFilters>) {
    this.filters.update(current => ({
      ...current,
      ...filters,
    }));
  }

  clear() {
    this.filters.set({});
  }
}