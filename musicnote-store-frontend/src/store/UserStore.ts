import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LoginResponse } from "../types/Auth";
import { UserRole } from "../types/UserRole";
import { UserStatus } from "../types/UserStatus";


  
interface User {
    username: string;
    role: string; 
    lastLogin?: string; 
}

interface AuthState {
    user?: User;
    accessToken?: string;
    refreshToken?: string;
    isLoggedIn: boolean;
    login: (res: LoginResponse) => void;
    logout: () => void;
}

export const useUserStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: undefined,
      accessToken: undefined,
      refreshToken: undefined,
      login: (res: LoginResponse) => 
        set({ 
                isLoggedIn: true,
                user: {
                        username:res.username,
                        role:res.role,
                        lastLogin: res.lastLogin
                },
                accessToken: res.accessToken,
                refreshToken: res.refreshToken,
         }),
      logout: () => set({ 
                            isLoggedIn: false, 
                            accessToken: undefined,
                            refreshToken: undefined,                  
         }),
    }),
    {
      name: "user-storage", // localStorage key
    }
  )
);
