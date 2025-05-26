import { API_BASE_URL, API_ENDPOINTS, CACHE_SETTINGS, DEFAULT_HEADERS, ERROR_MESSAGES } from "../constant"

export interface Poster {
  _id: string;
  name: string;
  descriptions: string;
  poster: string;
  createdAt: string;
  updatedAt: string;
  type: string;
  lang: string;
  quality: string;
  anotherName: string;
  link:string;
}

export interface PosterResponse {
  data: Poster[];
  pagination: {
    currentPage: number;
    totalPages: number;
  };
}

export async function fetchPosters(): Promise<PosterResponse> {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.POSTER}`, {
    next: {
      revalidate: CACHE_SETTINGS.REVALIDATE_15,
      tags: ['posters']
    },
    headers: DEFAULT_HEADERS,
  });

  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.POSTER_FETCH_FAILED);
  }

  return response.json();
}

export async function getPosterData(id: string) {
  try {
    const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.POSTER}/${id}`, {
      next: {
        revalidate: CACHE_SETTINGS.REVALIDATE_15,
        tags: [`poster-${id}`]
      },
      headers: DEFAULT_HEADERS,
    });

    if (!res.ok) {
      console.error(`Failed to fetch poster data: ${res.status} ${res.statusText}`);
      return null;
    }

    const data = await res.json();

    if (!data) {
      console.error(ERROR_MESSAGES.NO_DATA);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching poster data:', error);
    return null;
  }
} 