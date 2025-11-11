import type { ProductType } from '../types/ProductType';

export interface CarouselItem {
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