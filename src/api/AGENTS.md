# API Architecture

The project uses a 3-layer architecture to connect with the backend API:

```
src/api/
  client.ts              ← Layer 1: base fetch wrapper
  types.ts               ← shared API types
  services/
    auth.ts              ← Layer 2: auth endpoint calls
    events.ts            ← Layer 2: events endpoint calls
  composables/
    useAuth.ts           ← Layer 3: TanStack Query composables for auth
    useEvents.ts         ← Layer 3: TanStack Query composables for events
```

---

## Layer 1 — Client (`client.ts`)

The base HTTP client wrapping native `fetch`. It is the **only** file that directly calls `fetch`.

**Responsibilities:**
- Read `VITE_API_BASE_URL` from `import.meta.env`
- Set `credentials: 'include'` on every request (HTTP-only cookie auth)
- Wrap all responses in a standard envelope: `{ data: T | null, error: string | null }`
- Forward HTTP method, headers, and body from callers
- Pass raw errors upward without transformation

```typescript
// src/api/client.ts
interface ApiResponse<T> {
  data: T | null
  error: string | null
}

export async function client<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const url = `${import.meta.env.VITE_API_BASE_URL}${endpoint}`

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

    const data = await response.json()
    return { data, error: null }
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : 'Unknown error' }
  }
}
```

**Rules:**
- No interceptors
- No AbortController support
- No blob/file download handling
- Only JSON responses are expected

---

## Layer 2 — Services (`services/*.ts`)

One file per endpoint group. Each service imports `client` and exports plain async functions.

**Responsibilities:**
- Define typed request parameters and typed response payloads
- Call `client` with the correct HTTP method and path
- Return what `client` returns — no business logic, no error transformation

```typescript
// src/api/services/auth.ts
import { client } from '../client'

interface LoginPayload {
  email: string
  password: string
}

interface LoginResponse {
  user: { id: string; name: string; email: string }
}

export function login(payload: LoginPayload) {
  return client<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function register(payload: { name: string; email: string; password: string }) {
  return client<LoginResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function logout() {
  return client<null>('/auth/logout', { method: 'POST' })
}
```

```typescript
// src/api/services/events.ts
import { client } from '../client'

interface Event {
  id: string
  title: string
  date: string
  description: string
}

export function getEvents() {
  return client<Event[]>('/events')
}

export function getEvent(id: string) {
  return client<Event>(`/events/${id}`)
}

export function createEvent(payload: Omit<Event, 'id'>) {
  return client<Event>('/events', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function updateEvent(id: string, payload: Partial<Event>) {
  return client<Event>(`/events/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export function deleteEvent(id: string) {
  return client<null>(`/events/${id}`, { method: 'DELETE' })
}
```

**Rules:**
- File names are camelCase
- Function names are camelCase
- No classes
- No business logic transformations

---

## Layer 3 — Composables (`composables/*.ts`)

Wraps service functions with TanStack Query (`@tanstack/vue-query`). Components **never** import services or client directly — only composables.

**Setup in `main.ts`:**

```typescript
import { createApp } from 'vue'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
import App from './App.vue'

const queryClient = new QueryClient()

createApp(App).use(VueQueryPlugin, { queryClient }).mount('#app')
```

**Composable — Queries (GET):**

```typescript
// src/api/composables/useEvents.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { getEvents, getEvent, createEvent, updateEvent, deleteEvent } from '../services/events'
import type { Event } from '../services/events'

export function useEvents() {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const res = await getEvents()
      if (res.error) throw new Error(res.error)
      return res.data!
    },
  })
}

export function useEvent(id: string) {
  return useQuery({
    queryKey: ['events', id],
    queryFn: async () => {
      const res = await getEvent(id)
      if (res.error) throw new Error(res.error)
      return res.data!
    },
  })
}
```

**Composable — Mutations (POST/PUT/DELETE):**

```typescript
// src/api/composables/useEvents.ts (continued)
export function useCreateEvent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: Omit<Event, 'id'>) => {
      const res = await createEvent(payload)
      if (res.error) throw new Error(res.error)
      return res.data!
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })
}

export function useUpdateEvent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, ...payload }: Event) => {
      const res = await updateEvent(id, payload)
      if (res.error) throw new Error(res.error)
      return res.data!
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })
}

export function useDeleteEvent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteEvent(id)
      if (res.error) throw new Error(res.error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })
}
```

```typescript
// src/api/composables/useAuth.ts
import { useMutation } from '@tanstack/vue-query'
import { login, register, logout } from '../services/auth'

export function useLogin() {
  return useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const res = await login(payload)
      if (res.error) throw new Error(res.error)
      return res.data!
    },
  })
}

export function useRegister() {
  return useMutation({
    mutationFn: async (payload: { name: string; email: string; password: string }) => {
      const res = await register(payload)
      if (res.error) throw new Error(res.error)
      return res.data!
    },
  })
}

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      const res = await logout()
      if (res.error) throw new Error(res.error)
    },
  })
}
```

---

## Layer 4 — Components

Components import composables only. Never import `client` or services directly.

```vue
<script setup lang="ts">
import { useEvents, useCreateEvent } from '@/api/composables/useEvents'

const { data: events, isPending, isError, error } = useEvents()
const { mutate: createEvent, isPending: isCreating } = useCreateEvent()

function handleSubmit() {
  createEvent({ title: 'New Event', date: '2026-07-01', description: '...' })
}
</script>
```

---

## Conventions & Prohibitions

### ✅ Do
- Add new service files under `services/` as new endpoint groups emerge
- Add new composable files under `composables/` when new features need data
- Always invalidate related query keys after mutations
- Use TypeScript types for all request payloads and responses
- Keep file names in camelCase
- Keep function names in camelCase
- Keep composables in `useX` (camelCase) pattern

### 🚫 Do NOT
- Call `fetch`, `client`, or any service function directly inside a component
- Add business logic or data transformation inside service functions
- Use runtime validation libraries (Zod, etc.) — TypeScript types only
- Handle blob/file downloads through this layer
- Use AbortController

---

## Auth Flow

Authentication uses **HTTP-only cookies**. The `client.ts` sets `credentials: 'include'` on every request so the browser automatically sends cookies. No token handling is needed on the frontend.

If auth strategy changes in the future (e.g., Bearer tokens stored in memory/localStorage), only `client.ts` needs to be updated — services and composables stay untouched.
