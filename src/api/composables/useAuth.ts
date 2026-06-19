import { useMutation } from '@tanstack/vue-query'
import { signin, signup } from '../services/auth'

export function useSignin() {
  return useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const res = await signin(payload)
      if (res.error) throw new Error(res.error)
      return res.data!
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
