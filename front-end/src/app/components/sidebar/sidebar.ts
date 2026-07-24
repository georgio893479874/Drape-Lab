import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFilterService } from '../../services/product-filter.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sidebar.html',
})
export class Sidebar implements OnInit {
  private filters = inject(ProductFilterService);
  private http = inject(HttpClient);

  colorMap: Record<string, string> = {
    Black: '#000000',
    White: '#ffffff',
    Ivory: '#FFFFF0',
    Silver: '#C0C0C0',
    'Crystal Silver': '#D9D9D9',
    Gold: '#D4AF37',
    Champagne: '#F7E7CE',
    'Champagne Nude': '#E6C7A1',
    'Nude Gold': '#D8B46A',
    Magenta: '#FF00FF',
    'Royal Blue': '#4169E1',
    'Emerald Green': '#50C878',
    'Black and White': 'linear-gradient(90deg,#000 50%,#fff 50%)',
  };

  colors: string[] = [];
  sizes: string[] = [];
  selectedColor = '';
  selectedSize = '';
  minPrice = 0;
  maxPrice = 0;
  selectedPrice = 0;
  search = '';

  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  categories: any[] = [];
  selectedCategory = '';

  ngOnInit() {
    this.http.get<any[]>(`${environment.apiUrl}/categories`).subscribe((res) => {
      this.categories = res;
    });

    this.http.get<any>(`${environment.apiUrl}/filters/price`).subscribe((res) => {
      this.minPrice = res.min;
      this.maxPrice = res.max;
      this.selectedPrice = res.max;
    });

    this.http.get<string[]>(`${environment.apiUrl}/filters/colors`).subscribe((res) => {
      this.colors = res;
    });

    this.http.get<string[]>(`${environment.apiUrl}/filters/sizes`).subscribe((res) => {
      this.sizes = res;
    });
  }

  selectCategory(id: string) {
    this.selectedCategory = id;

    this.filters.update({
      categoryId: id,
    });
  }

  applyFilters() {
    this.filters.update({
      search: this.search.trim(),
      categoryId: this.selectedCategory,
      maxPrice: this.selectedPrice,
      color: this.selectedColor,
      size: this.selectedSize,
    });

    this.close.emit();
  }

  searchProduct() {
    this.filters.update({
      search: this.search,
    });
  }

  selectColor(color: string) {
    this.selectedColor = this.selectedColor === color ? '' : color;
  }

  selectSize(size: string) {
    this.selectedSize = this.selectedSize === size ? '' : size;
  }

  getColorStyle(color: string) {
    const value = this.colorMap[color];

    if (value?.startsWith('linear-gradient')) {
      return {
        background: value,
      };
    }

    return {
      backgroundColor: value || '#ddd',
    };
  }
}
