interface ApiResponse<T> {
  data: T | null
  error: string | null
}

export async function client<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {

  if(!import.meta.env.VITE_API_URL){
    throw new Error("API not found")
  }
  const url = `${import.meta.env.VITE_API_URL}${endpoint}`

  const token = localStorage.getItem('accessToken')
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }
  if (token) headers['Authorization'] = `Bearer ${token}`

  try {
    const response = await fetch(url, {
      ...options,
      credentials: 'include',
      headers,
    })

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
