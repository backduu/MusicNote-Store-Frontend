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