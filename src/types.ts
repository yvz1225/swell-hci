export type Style = '캐주얼' | '스트릿' | '포멀' | '스포티';
export type Season = '봄' | '여름' | '가을' | '겨울';
export type Category = 'Tops' | 'Bottoms' | 'Accessory';

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
  purchaseUrl?: string;
  category: Category;
}

export interface Outfit {
    id: number;
    imageUrl: string;
    style: Style;
    season: Season;
    products: Product[];
}

export interface UserProfile {
    height: number;
    weight: number;
    bust: number;
    waist: number;
    hips: number;
}