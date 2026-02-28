export interface Product {
  id: number;
  name: string;
  nameRu: string;
  description: string;
  price: number;
  image: string;
  category: string;
  categoryRu: string;
  inStock: boolean;
  weight?: string;
  origin?: string;
}

export interface CartItem extends Product {
  quantity: number;
}
