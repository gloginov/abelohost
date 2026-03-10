export interface Product {
  id: number;
  title: string;
  price: number;
  oldPrice?: number;
  image: string[];
  thumbnail: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  category: string;
  isNew?: boolean;
  isHit?: boolean;
}