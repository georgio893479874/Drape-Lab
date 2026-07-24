import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.html',
})
export class Product implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private cartService = inject(CartService);

  product: any = null;

  selectedImage = '';
  quantity = 1;

  readonly sizes = ['XS', 'S', 'M', 'L', 'XL'];
  selectedSize = 'M';

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params) => this.http.get(`${environment.apiUrl}/products/${params.get('id')}`)),
      )
      .subscribe((product: any) => {
        this.product = product;
        this.selectedImage = product.mainImageUrl;
      });
  }

  selectImage(image: string) {
    this.selectedImage = image;
  }

  selectSize(size: string) {
    this.selectedSize = size;
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    this.cartService.addItem(this.product.id, this.quantity).subscribe(() => {
      console.log('Product added to cart!');
    });
  }
}
