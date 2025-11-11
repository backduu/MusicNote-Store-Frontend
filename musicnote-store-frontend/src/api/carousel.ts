import axiosInstance from "./axiosInstance";
import type { CarouselItem } from "../types/Carousel"

export async function fetchCarouselItems(): Promise<CarouselItem[]> {
    const response = await axiosInstance.get("/products/carousel/new");

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