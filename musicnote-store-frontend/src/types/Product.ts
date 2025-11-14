import type { ProductType } from '../types/ProductType';
import type { ProductStatus } from './productStatus';
export interface Items {
    id: number;
    title: string;
    description: string;
    price: number;
    type: ProductType;
    creator: string;
    genre: string;
    like: string;
    view: string;
    previewUrl: string;
    filePath: string;
    status: ProductStatus;
    sellerId: number;
    sellerName: string;
    tags: string[];
    createdAt: string;  
    updatedAt: string;  
}