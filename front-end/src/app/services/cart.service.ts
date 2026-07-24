import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);
  private cartId = localStorage.getItem('cartId');

  getCart(): Observable<any> {
    if (!this.cartId) {
      return this.createCart().pipe(
        switchMap((cart: any) => {
          this.cartId = cart.id;
          localStorage.setItem('cartId', cart.id);
          return this.http.get(`${environment.apiUrl}/cart/${cart.id}`);
        })
      );
    }

    return this.http.get(`${environment.apiUrl}/cart/${this.cartId}`);
  }

  private createCart() {
    return this.http.post(`${environment.apiUrl}/cart`, {
      sessionId: crypto.randomUUID(),
    });
  }

  addItem(productId: string, quantity: number) {
    if (!this.cartId) {
      return this.createCart().pipe(
        switchMap((cart: any) => {
          this.cartId = cart.id;
          localStorage.setItem('cartId', cart.id);

          return this.http.post(
            `${environment.apiUrl}/cart/${cart.id}/items`,
            {
              productId,
              quantity,
            }
          );
        })
      );
    }

    return this.http.post(
      `${environment.apiUrl}/cart/${this.cartId}/items`,
      {
        productId,
        quantity,
      }
    );
  }

  removeItem(id: string) {
    return this.http.delete(`${environment.apiUrl}/cart/items/${id}`);
  }
}