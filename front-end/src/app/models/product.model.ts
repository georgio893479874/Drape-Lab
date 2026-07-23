import { Category } from "./category.model";

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
  category?: Category;
}

export interface ProductAttribute {
  id: string;
  name: string;
  value: string;
}
