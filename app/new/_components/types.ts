export interface Movie {
  _id: string
  name: string
  slug: string
  linkImg: string
  year: string
  time: string
  isActive?: number
  products?: Array<{ _id: string; seri: string }>
  week?: string
}

export type ViewMode = "grid" | "list" 