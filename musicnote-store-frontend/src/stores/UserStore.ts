import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { LoginResponse } from '../types/Auth'

interface User {
    username: string;
    role: string; 
    lastLogin?: string; 
}

export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref(false)
  const user = ref<User | undefined>(undefined)
  const accessToken = ref<string | undefined>(undefined)
  const refreshToken = ref<string | undefined>(undefined)

  function login(res: LoginResponse) {
    isLoggedIn.value = true
    user.value = {
      username: res.username,
      role: res.role,
      lastLogin: res.lastLogin
    }
    accessToken.value = res.accessToken
    refreshToken.value = res.refreshToken
  }

  function logout() {
    isLoggedIn.value = false
    user.value = undefined
    accessToken.value = undefined
    refreshToken.value = undefined
  }

  return {
    isLoggedIn,
    user,
    accessToken,
    refreshToken,
    login,
    logout
  }
}, {
  persist: true
})
