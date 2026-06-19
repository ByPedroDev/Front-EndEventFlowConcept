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

  try {
    const response = await fetch(url, {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
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
