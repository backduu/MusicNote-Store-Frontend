import { UserRole } from "../types/UserRole"; 
import { UserStatus } from "../types/UserStatus";
import axiosInstance from "./axiosInstance";

export interface LoginRequest {
    username: string;
    password: string;
}
  
export interface LoginResponse {
token: string; // JWT 토큰 등
user: {
    id: number;
    username: string;
    email: string;
    role: UserRole;
    status: UserStatus;
};
}
  
export async function login(data: LoginRequest): Promise<LoginResponse> {
    const response = await axiosInstance.post("auth/login", data);
    return response.data;
}
  