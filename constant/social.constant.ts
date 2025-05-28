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


export const LINK_DOMAIN_SERVER_CLOUD = [
  'bit.ly',
  'tinyurl.com',
  'short.link',
  'is.gd',
  'goo.gl',
  't.co',
  'ow.ly',
  'buff.ly',
  'cutt.ly',
  'rb.gy',
  'linktr.ee',
  'tiny.cc',
  'bc.vc',
  'adf.ly',    // Ad-based shortener
  'sh.st',     // Ad-based shortener  
  'ouo.io',    // Ad-based shortener
  'shink.me',  // Ad-based shortener
  'exe.io',    // Ad-based shortener
  'clk.sh',    // Ad-based shortener
  'za.gl',     // Ad-based shortener
  'short.pe',  // Ad-based shortener
  'coin.mg',   // Ad-based shortener
  'fc.lc',     // Ad-based shortener
  'zzb.bz',    // Ad-based shortener
  'urle.co',   // Ad-based shortener
  'shorten.sh', // Ad-based shortener
  'earnow.online', // Ad-based shortener
  'yep.it',
  'vk.cc',
  'fumacrom.com',
  "short.icu",
  "abyss.to",  // Abyss Cloud domain
  "abysscloud.to", // Abyss Cloud domain
  "abysscloud.com" // Abyss Cloud domain
]

export const SELECTOR_ADLINK = [
  // Selectors hiện tại
  '[id*="ad"]',
  '[class*="ad"]',
  '[class*="advertisement"]',
  '[class*="popup"]',
  '[class*="overlay"]',
  '[class*="banner"]',
  '[class*="promo"]',
  '.ad-container',
  '.ads',
  '.advertisement',
  '.popup-overlay',
  '.modal-overlay',
  '.ad-banner',
  '.video-ads',
  '.preroll-ad',
  '.midroll-ad',
  '.postroll-ad',
  // Thêm selectors mới
  '[id*="popup"]',
  '[id*="banner"]',
  '[id*="overlay"]',
  '[id*="modal"]',
  '[class*="modal"]',
  '[class*="dialog"]',
  '[id*="dialog"]',
  '[class*="lightbox"]',
  '[id*="lightbox"]',
  '[class*="sponsored"]',
  '[id*="sponsored"]',
  '[class*="promotion"]',
  '[id*="promotion"]',
  '[class*="commercial"]',
  '[id*="commercial"]',
  'iframe[src*="ad"]',
  'iframe[src*="banner"]',
  'iframe[src*="popup"]',
  'iframe[src*="promo"]',
  'iframe[src*="sponsored"]',
  'div[style*="position: fixed"]',
  'div[style*="position:absolute"]',
  'div[style*="z-index: 9999"]',
  'div[style*="z-index:9999"]',
  'div[style*="z-index: 999"]',
  'div[style*="z-index:999"]'
]