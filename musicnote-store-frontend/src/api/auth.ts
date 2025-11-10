import { UserRole } from "../types/UserRole"; 
import { UserStatus } from "../types/UserStatus";
import axiosInstance from "./axiosInstance";
import type { LoginResponse } from "../types/Auth";
export interface LoginRequest {
    username: string;
    password: string;
}
  
export async function login(data: LoginRequest): Promise<LoginResponse> {
    const response = await axiosInstance.post("auth/login", data);
    return response.data;
}
  