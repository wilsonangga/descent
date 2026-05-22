export type ProductCategory = 'desk' | 'chair' | 'accessory';

export type SceneSlot =
  | 'monitor-left'
  | 'monitor-center'
  | 'monitor-right'
  | 'lamp'
  | 'keyboard'
  | 'mouse'
  | 'webcam'
  | 'coffee'
  | 'plant'
  | 'whiteboard';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  priceOriginal?: number;
  image: string;
  url: string;
  badge?: string;
  category: ProductCategory;
  sceneSlot?: SceneSlot;
  emoji?: string;
}

export interface WorkspaceState {
  desk: Product | null;
  chair: Product | null;
  accessories: Product[];
}
