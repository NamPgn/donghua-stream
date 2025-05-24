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

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8001/api';

export async function fetchPosters(): Promise<PosterResponse> {
  const response = await fetch(`${API_URL}/poster`, {
    next: {
      revalidate: 15,
      tags: ['posters']
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch posters');
  }

  return response.json();
}

export async function getPosterData(id: string) {
  try {
    const res = await fetch(`${API_URL}/poster/${id}`, {
      next: {
        revalidate: 15, // Cache for 1 hour
        tags: [`poster-${id}`] // Add tag for manual revalidation if needed
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      console.error(`Failed to fetch poster data: ${res.status} ${res.statusText}`);
      return null;
    }

    const data = await res.json();

    if (!data) {
      console.error('No data received from API');
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching poster data:', error);
    return null;
  }
} 