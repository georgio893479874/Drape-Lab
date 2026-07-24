import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
})
export class Cart implements OnInit {
  private cartService = inject(CartService);

  cart: any;

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe((cart) => {
      this.cart = cart;
    });
  }

  remove(itemId: string) {
    this.cartService.removeItem(itemId).subscribe(() => {
      this.loadCart();
    });
  }

  getTotal() {
    if (!this.cart) return 0;

    return this.cart.items.reduce(
      (sum: number, item: any) =>
        sum +
        (item.product.discountPrice || item.product.price) *
          item.quantity,
      0
    );
  }
}