export interface SliderItem {
  _id: string
  name: string
  anotherName: string
  poster: string
  descriptions: string
  type: string
  quality: string
  lang: string
  isMovie: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface SliderResponse {
  success: boolean
  data: SliderItem[]
} 