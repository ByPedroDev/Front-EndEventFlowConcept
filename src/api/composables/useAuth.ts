import { computed } from 'vue'
import { useMutation } from '@tanstack/vue-query'
import { signin, signup, refreshToken } from '../services/auth'

const TOKEN_KEY = 'accessToken'

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setStoredToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearStoredToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

export function useAuthToken() {
  const token = computed(() => getStoredToken())
  const isAuthenticated = computed(() => !!token.value)
  return { token, isAuthenticated, setToken: setStoredToken, clearToken: clearStoredToken }
}

export function useSignin() {
  return useMutation({
    mutationFn: async (payload: { email: string; passwd: string }) => {
      const res = await signin(payload)
      if (res.error) throw new Error(res.error)
      return res.data!
    },
    onSuccess: (data) => {
      setStoredToken(data.accessToken)
    },
  })
}

export function useSignup() {
  return useMutation({
    mutationFn: async (payload: { name: string; email: string; password: string; phone?: string }) => {
      const res = await signup(payload)
      if (res.error) throw new Error(res.error)
      return res.data!
    },
  })
}

export function useRefreshToken() {
  return useMutation({
    mutationFn: async () => {
      const res = await refreshToken()
      if (res.error) throw new Error(res.error)
      return res.data!
    },
    onSuccess: (data) => {
      setStoredToken(data.accessToken)
    },
    onError: () => {
      clearStoredToken()
    },
  })
}
