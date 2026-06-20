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
