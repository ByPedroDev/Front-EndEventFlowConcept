import { client } from '../client'

interface SignupPayload {
  name: string
  email: string
  password: string
  phone?: string
}

interface SigninPayload {
  email: string
  password: string
}

interface SigninResponse {
  accessToken: string
  expiresIn: number
}

export function signup(payload: SignupPayload) {
  return client<null>('/api/v1/auth/signup', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function signin(payload: SigninPayload) {
  return client<SigninResponse>('/api/v1/auth/signin', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
