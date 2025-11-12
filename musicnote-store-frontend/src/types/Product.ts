import type { ProductType } from '../types/ProductType';

export interface Items {
    id: number;
    title: string;
    description: string;
    price: number;
    type: ProductType;
    creator: string;
    previewUrl: string; 
    sellerName: string;
    tags: string[];
    createdAt: string;
}