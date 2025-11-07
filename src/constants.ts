import { Outfit } from './src/types';

export const MOCK_OUTFITS: Outfit[] = [
  {
    id: 1,
    imageUrl: 'https://picsum.photos/seed/outfit1/800/1200',
    style: '캐주얼',
    season: '봄',
    products: [
      { id: 101, name: 'Striped Cotton Tee', brand: 'Casual Wear Co.', price: 29.99, imageUrl: 'https://picsum.photos/seed/item101/200/200', purchaseUrl: '#', category: 'Tops' },
      { id: 102, name: 'Light Wash Denim Jeans', brand: 'Denim Day', price: 79.50, imageUrl: 'https://picsum.photos/seed/item102/200/200', purchaseUrl: '#', category: 'Bottoms' },
      { id: 103, name: 'White Canvas Sneakers', brand: 'WalkEasy', price: 55.00, imageUrl: 'https://picsum.photos/seed/item103/200/200', purchaseUrl: '#', category: 'Accessory' },
    ],
  },
  {
    id: 2,
    imageUrl: 'https://picsum.photos/seed/outfit2/800/1200',
    style: '스트릿',
    season: '가을',
    products: [
      { id: 201, name: 'Oversized Graphic Hoodie', brand: 'Street Vibe', price: 89.99, imageUrl: 'https://picsum.photos/seed/item201/200/200', purchaseUrl: '#', category: 'Tops' },
      { id: 202, name: 'Black Cargo Pants', brand: 'Urban Utility', price: 95.00, imageUrl: 'https://picsum.photos/seed/item202/200/200', purchaseUrl: '#', category: 'Bottoms' },
      { id: 203, name: 'High-Top Chunky Sneakers', brand: 'Kicks', price: 150.00, imageUrl: 'https://picsum.photos/seed/item203/200/200', purchaseUrl: '#', category: 'Accessory' },
    ],
  },
  {
    id: 3,
    imageUrl: 'https://picsum.photos/seed/outfit3/800/1200',
    style: '포멀',
    season: '겨울',
    products: [
      { id: 301, name: 'Wool Blend Overcoat', brand: 'Modern Tailor', price: 299.99, imageUrl: 'https://picsum.photos/seed/item301/200/200', purchaseUrl: '#', category: 'Tops' },
      { id: 302, name: 'Cashmere Turtleneck', brand: 'Luxe Knits', price: 180.00, imageUrl: 'https://picsum.photos/seed/item302/200/200', purchaseUrl: '#', category: 'Tops' },
      { id: 303, name: 'Tailored Trousers', brand: 'Sharp Looks', price: 120.00, imageUrl: 'https://picsum.photos/seed/item303/200/200', purchaseUrl: '#', category: 'Bottoms' },
      { id: 304, name: 'Leather Chelsea Boots', brand: 'Foot-Forward', price: 190.00, imageUrl: 'https://picsum.photos/seed/item304/200/200', purchaseUrl: '#', category: 'Accessory' },
    ],
  },
  {
    id: 4,
    imageUrl: 'https://picsum.photos/seed/outfit4/800/1200',
    style: '스포티',
    season: '여름',
    products: [
        { id: 401, name: 'Breathable Running Tank', brand: 'FitFast', price: 45.00, imageUrl: 'https://picsum.photos/seed/item401/200/200', purchaseUrl: '#', category: 'Tops' },
        { id: 402, name: 'High-Waist Biker Shorts', brand: 'ActiveLife', price: 60.00, imageUrl: 'https://picsum.photos/seed/item402/200/200', purchaseUrl: '#', category: 'Bottoms' },
        { id: 403, name: 'Lightweight Running Shoes', brand: 'AeroRun', price: 130.00, imageUrl: 'https://picsum.photos/seed/item403/200/200', purchaseUrl: '#', category: 'Accessory' },
    ]
  },
  {
    id: 5,
    imageUrl: 'https://picsum.photos/seed/outfit5/800/1200',
    style: '캐주얼',
    season: '여름',
    products: [
        { id: 501, name: 'Linen Button-Up Shirt', brand: 'Breezy', price: 65.00, imageUrl: 'https://picsum.photos/seed/item501/200/200', purchaseUrl: '#', category: 'Tops' },
        { id: 502, name: 'Khaki Chino Shorts', brand: 'Summer Days', price: 50.00, imageUrl: 'https://picsum.photos/seed/item502/200/200', purchaseUrl: '#', category: 'Bottoms' },
        { id: 503, name: 'Suede Loafers', brand: 'Easy Step', price: 85.00, imageUrl: 'https://picsum.photos/seed/item503/200/200', purchaseUrl: '#', category: 'Accessory' },
    ]
  }
];