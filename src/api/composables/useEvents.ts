import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { getEvents, createEvent, checkin, confirmCheckin } from '../services/events'
import type { CreateEventPayload } from '../services/events'

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

export function useCreateEvent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: CreateEventPayload) => {
      const res = await createEvent(payload)
      if (res.error) throw new Error(res.error)
      return res.data!
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })
}

export function useCheckin() {
  return useMutation({
    mutationFn: async (eventId: string) => {
      const res = await checkin(eventId)
      if (res.error) throw new Error(res.error)
      return res.data
    },
  })
}

export function useConfirmCheckin(id: string) {
  return useQuery({
    queryKey: ['checkin', id],
    queryFn: async () => {
      const res = await confirmCheckin(id)
      if (res.error) throw new Error(res.error)
      return res.data
    },
    retry: false,
    gcTime: 0,
  })
}
