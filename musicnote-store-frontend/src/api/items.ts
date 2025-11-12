import axiosInstance from "./axiosInstance";
import type { Items } from "../types/Product";

export async function fetchNewArrivals(): Promise<Items[]> {
    const response = await axiosInstance.get("/products/new");
    
    return response.data.map((p: any) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        price: Number(p.price),
        type: p.type,
        creator: p.creator,
        previewUrl: p.previewUrl,
        sellerName: p.sellerName,
        tags: p.tags,
        createdAt: p.createdAt,
    }));
}