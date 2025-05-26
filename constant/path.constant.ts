// Anime/Movie Paths
export const ANIME_PATHS = {
  BASE: '/phim',
  WATCH: '/xem-phim',
  WATCH_EPISODE: (slug: string, episode: string) => `${ANIME_PATHS.WATCH}/${slug}-episode-${episode}`,
  WATCH_MOVIE: (slug: string) => `${ANIME_PATHS.WATCH}/${slug}`,
  DETAIL: (slug: string) => `${ANIME_PATHS.BASE}/${slug}`,
  SEARCH: '/tim-kiem',
  CATEGORY: (slug: string) => `/the-loai/${slug}`,
  LATEST: '/phim-moi',
  POPULAR: '/phim-hot',
  UPCOMING: '/phim-sap-chieu',
} as const;

// Series Paths
export const SERIES_PATHS = {
  BASE: '/series',
  DETAIL: (slug: string) => `/series/${slug}`,
  HEADER: '/series/header',
} as const;

// User Paths
export const USER_PATHS = {
  PROFILE: '/profile',
  SETTINGS: '/settings',
  FAVORITES: '/favorites',
  HISTORY: '/history',
  NOTIFICATIONS: '/notifications',
} as const;

// Auth Paths
export const AUTH_PATHS = {
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
} as const;

// Other Paths
export const OTHER_PATHS = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  HELP: '/help',
  TERMS: '/terms',
  PRIVACY: '/privacy',
} as const; 