export interface CartItem {
  productId: string;
  productName: string;
  productImageUrl: string;
  price: number;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}
