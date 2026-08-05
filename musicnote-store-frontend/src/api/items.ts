import axiosInstance from "./axiosInstance";
import type { Items } from "../types/Product";

const defaultPreviewUrls: Record<string, string> = {
    ALBUM: import.meta.env.VITE_ALBUM_DEFAULT_PREVIEW_URL,
    SONG: import.meta.env.VITE_SONG_DEFAULT_PREVIEW_URL,
    SHEET: import.meta.env.VITE_SHEET_DEFAULT_PREVIEW_URL,
};


export async function fetchNewArrivals(): Promise<Items[]> {
    const response = await axiosInstance.get("/products/new");
    
    return response.data.map((p: any) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        price: Number(p.price),
        type: p.type,
        creator: p.creator,
        previewUrl: p.previewUrl || defaultPreviewUrls[p.type] || null,
        sellerName: p.sellerName,
        tags: p.tags,
        createdAt: p.createdAt,
    }));
}

export async function fetchGlobalSearch(keyword: string, page: number = 0, size: number = 15): Promise<Items[]> {
    const response = await axiosInstance.get("/products/global-search", {
            params: {
                keyword: keyword,
                page: page,
                size: size,
            }
        });

    return response.data.map((p: any) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        price: Number(p.price),
        type: p.type,
        creator: p.creator,
        previewUrl: p.previewUrl || defaultPreviewUrls[p.type] || null,
        sellerName: p.sellerName,
        tags: p.tags,
        createdAt: p.createdAt,
    }));
}