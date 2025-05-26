// API URLs
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8001/api';

// API Endpoints
export const API_ENDPOINTS = {
  CATEGORY: '/category',
  PRODUCT: '/product',
  CATEGORIES_NOMINATED: '/categories/nominated',
  CATEGORY_SITEMAP: '/categorys/sitemap',
  POSTER: '/poster',
} as const;

// Cache Settings
export const CACHE_SETTINGS = {
  NO_CACHE: 'no-cache',
  REVALIDATE_15: 15,
  REVALIDATE_3600: 3600,
} as const;

// Headers
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
} as const;

// Timeouts
export const TIMEOUT = {
  DEFAULT: 10000, // 10 seconds
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  FETCH_FAILED: 'Failed to fetch data',
  NO_DATA: 'No data received from API',
  REQUEST_TIMEOUT: 'Request timeout',
  CATEGORY_NOMINATED_FAILED: 'Failed to fetch category nominated',
  CATEGORY_SITEMAP_FAILED: 'Failed to fetch category sitemap',
  POSTER_FETCH_FAILED: 'Failed to fetch posters',
  ACCESS_FORBIDDEN: 'Access forbidden',
  RESOURCE_NOT_FOUND: 'Resource not found',
  SERVER_ERROR: 'Server error',
  NETWORK_ERROR: 'Network error - no response received',
  GENERAL_ERROR: 'An error occurred',
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
} as const;

// Auth
export const AUTH = {
  TOKEN_KEY: 'token',
  AUTH_HEADER_PREFIX: 'Bearer',
  LOGIN_PATH: '/login',
} as const;
