export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  mainImageUrl: string;
  images?: string[];
  categoryId: string;
  isActive: boolean;
  attributes?: ProductAttribute[];
}

export interface ProductAttribute {
  name: string;
  value: string;
}
