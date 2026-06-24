interface ApiResponse<T> {
  data: T | null
  error: string | null
}

let isRefreshing = false

function getToken(): string | null {
  return localStorage.getItem('accessToken')
}

function setToken(token: string): void {
  localStorage.setItem('accessToken', token)
}

function clearToken(): void {
  localStorage.removeItem('accessToken')
}

export async function client<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {

  if(!import.meta.env.VITE_API_URL){
    throw new Error("API not found")
  }
  const baseUrl = import.meta.env.VITE_API_URL
  const url = `${baseUrl}${endpoint}`

  const token = getToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }
  if (token) headers['Authorization'] = `Bearer ${token}`

  try {
    let response = await fetch(url, {
      ...options,
      credentials: 'include',
      headers,
    })

    if (response.status === 401 && !isRefreshing) {
      isRefreshing = true
      try {
        const refreshRes = await fetch(`${baseUrl}api/v1/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        })

        if (refreshRes.ok) {
          const body = await refreshRes.json()
          setToken(body.accessToken)
          headers['Authorization'] = `Bearer ${body.accessToken}`
          response = await fetch(url, {
            ...options,
            credentials: 'include',
            headers,
          })
        } else {
          clearToken()
          return { data: null, error: 'Session expired. Please sign in again.' }
        }
      } finally {
        isRefreshing = false
      }
    }

    if (!response.ok) {
      const body = await response.json().catch(() => null)
      return { data: null, error: body?.error ?? response.statusText }
    }

    const text = await response.text()
    if (!text) return { data: null, error: null }
    const data = JSON.parse(text) as T
    return { data, error: null }
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : 'Unknown error' }
  }
}
