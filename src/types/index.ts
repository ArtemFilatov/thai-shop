export interface Product {
  id: number;
  article: string;
  name: string;
  nameRu: string;
  description: string;
  price: number;
  category: string;
  weight: string | null;
  inStock: boolean;
  image: string | null;
}

export interface CartItem extends Product {
  quantity: number;
}
