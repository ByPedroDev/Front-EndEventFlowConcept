import { useQuery } from '@tanstack/vue-query'
import { getEvents } from '../services/events'

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
