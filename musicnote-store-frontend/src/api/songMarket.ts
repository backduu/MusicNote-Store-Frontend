import type { MetricType } from "../types/MetricType";
import axiosInstance from "./axiosInstance";
import type { Items } from "../types/Product";
import type { ProductType } from "../types/ProductType"

export async function fetchSongMarket(
    type: ProductType = "SONG",
    region: "KOR" | "FOREIGN" = "KOR", 
    period: "TODAY" | "WEEK" | "MONTH" | "YEAR" | "ALL" = "MONTH",
    sort: MetricType | "RELEASED" = "LIKE", 
    genre: string | null = null,
    page = 0,
    size = 25,
    searchTerm: string | "" = ""
): Promise<Items[]> {
    const response = await axiosInstance.get("/products/songMarket", {
        params: {
          type,
          region,
          period,
          sort,
          genre,
          page,
          size,
          searchTerm
        },
      });
      return response.data;
    
}