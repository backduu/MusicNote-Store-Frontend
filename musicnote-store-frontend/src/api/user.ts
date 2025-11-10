import { UserRole } from "../types/UserRole"; 
import { UserStatus } from "../types/UserStatus";
import axiosInstance from "./axiosInstance";

export interface SignupRequest {
    username: string;
    nickname: string;
    name: string;
    email: string;
    address: string;
    phone: string;
    password: string;
    role: UserRole;
    status: UserStatus;
  }
  
export interface SignupResponse {
id: number;
username: string;
email: string;
role: UserRole;
}

export async function signup(data: SignupRequest): Promise<SignupResponse> {
    const response = await axiosInstance.post("user/signup", data);
    return response.data;
}