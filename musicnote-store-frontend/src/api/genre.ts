import axiosInstance from "./axiosInstance";

export async function fetchGenres(): Promise<string[]> {
    const response = await axiosInstance.get("/products/genres");
    return response.data;
}