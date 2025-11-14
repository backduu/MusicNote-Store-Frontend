import axiosInstance from "./axiosInstance";
import type { MetricType } from "../types/MetricType";
import type { Items } from "../types/Product";

export async function fetchHotTracks(
    metricType: MetricType = "VIEW",
    period: "TODAY" | "WEEK" | "MONTH" | "ALL" = "MONTH",
    page = 0,
    size = 25
): Promise<Items[]> {
    const response = await axiosInstance.get("/products/top100", {
        params: { metricType, period, page, size}
    });
    return response.data;
}