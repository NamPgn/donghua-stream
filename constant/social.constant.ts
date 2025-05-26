// Social Media Links
export const SOCIAL_LINKS = {
  FACEBOOK: 'https://facebook.com/',
  TWITTER: 'https://twitter.com/',
  INSTAGRAM: 'https://instagram.com/',
  YOUTUBE: 'https://youtube.com/',
  DISCORD: 'https://discord.gg/',
  TELEGRAM: 'https://t.me/',
  ZALO: "https://zalo.me/g/kxbtdy548"
} as const;

// External Links
export const EXTERNAL_LINKS = {
  DONATE: 'https://donate.example.com',
  SUPPORT: 'https://support.example.com',
  FAQ: 'https://faq.example.com',
  TERMS: 'https://terms.example.com',
  PRIVACY: 'https://privacy.example.com',
} as const;

// Internal Routes
export const INTERNAL_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  ABOUT: '/about',
  CONTACT: '/contact',
  HELP: '/help',
} as const;

// Media Links
export const MEDIA_LINKS = {
  DEFAULT_AVATAR: '/images/default-avatar.png',
  DEFAULT_COVER: '/images/default-cover.jpg',
  DEFAULT_POSTER: '/images/default-poster.jpg',
  LOGO: '/images/logo.png',
  FAVICON: '/favicon.ico',
} as const;

// Share Links
export const SHARE_LINKS = {
  FACEBOOK: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  TWITTER: (url: string, text: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  TELEGRAM: (url: string, text: string) => `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  WHATSAPP: (url: string, text: string) => `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
} as const; 