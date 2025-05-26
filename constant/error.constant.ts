export const ERROR_MESSAGES = {
  // General errors
  FETCH_FAILED: 'Failed to fetch data',
  NO_DATA: 'No data received from API',
  REQUEST_TIMEOUT: 'Request timeout',
  ACCESS_FORBIDDEN: 'Access forbidden',
  RESOURCE_NOT_FOUND: 'Resource not found',
  SERVER_ERROR: 'Server error',
  NETWORK_ERROR: 'Network error - no response received',
  GENERAL_ERROR: 'An error occurred',

  // Category errors
  CATEGORY_NOMINATED_FAILED: 'Failed to fetch category nominated',
  CATEGORY_SITEMAP_FAILED: 'Failed to fetch category sitemap',

  // Poster errors
  POSTER_FETCH_FAILED: 'Failed to fetch posters',
} as const; 