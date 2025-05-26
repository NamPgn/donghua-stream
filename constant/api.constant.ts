// API URLs
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8001/api';

// API Endpoints
export const API_ENDPOINTS = {
  // Anime endpoints
  ANIME: {
    LATEST: '/category/latest/next',
    POPULAR: '/category/filters',
    BY_SLUG: '/category',
    EPISODE: '/product',
    SEARCH: '/categorys/search',
  },
  // Poster endpoints
  POSTER: {
    BASE: '/poster',
  },
  // Series endpoints
  SERIES: {
    HEADER: '/series/header',
    BY_SLUG: '/series',
  },
  // Category endpoints
  CATEGORY: {
    BASE: '/category',
    PRODUCT: '/product',
    NOMINATED: '/categories/nominated',
    SITEMAP: '/categorys/sitemap',
  },
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
} as const;

// Headers
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
} as const;

// Timeouts
export const TIMEOUT = {
  DEFAULT: 10000, // 10 seconds
} as const; 