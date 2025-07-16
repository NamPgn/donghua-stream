import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Anime {
  _id: string
  name: string
  linkImg: string
  slug: string
  anotherName?: string
}

interface WatchlistState {
  animes: Anime[]
  addAnime: (anime: Anime) => void
  removeAnime: (animeId: string) => void
  isInWatchlist: (animeId: string) => boolean
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      animes: [],
      addAnime: (anime) => {
        const isExist = get().isInWatchlist(anime._id)
        if (!isExist) {
          set((state) => ({
            // Thêm anime mới và giới hạn 10 items
            animes: [anime, ...state.animes].slice(0, 10)
          }))
        }
      },
      removeAnime: (animeId) => {
        set((state) => ({
          animes: state.animes.filter((anime) => anime._id !== animeId)
        }))
      },
      isInWatchlist: (animeId) => {
        return get().animes.some((anime) => anime._id === animeId)
      }
    }),
    {
      name: 'watchlist-storage',
    }
  )
) 