import { baseApi } from "./base.api"

export interface AnimeProduct {
  _id: string
  seri: string
}

export interface Tag {
  _id: string
  name: string
}

export interface AnimeContent {
  _id: string
  name: string
  linkImg: string
  sumSeri: string
  products: AnimeProduct[]
  type: string
  time: string
  year: string
  slug: string
  tags: Tag[]
}

export interface Schedule {
  name: string
  content: AnimeContent[]
}

export const scheduleApi = {
  getByWeek: (week: string) => {
    return baseApi.get<Schedule>(`/week?w=${encodeURIComponent(week)}`)
  }
} 