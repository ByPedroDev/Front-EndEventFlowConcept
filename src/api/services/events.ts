import { client } from '../client'

export interface EventResponse {
  id: string
  name: string
  description: string
  address: string
  maxParticipants: number
  startsAt: string
  endsAt: string
  status: string
  createdAt: string
  bannerUrl: string
}

export function getEvents() {
  return client<EventResponse[]>('api/v1/event/all')
}

export interface CreateEventPayload {
  name: string
  description: string
  address: string
  maxParticipants: number
  startsAt: string
  endsAt: string
  status: string
  bannerUrl: string
}

export function createEvent(payload: CreateEventPayload) {
  return client<EventResponse>('api/v1/event/create', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
