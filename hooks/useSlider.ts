import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Poster {
	_id: string;
	name: string;
	descriptions: string;
	poster: string;
	createdAt: string;
	updatedAt: string;
    type:string;
    lang:string;
    quality:string;
    anotherName:string
}

interface PosterResponse {
	data: Poster[];
	pagination: {
		currentPage: number;
		totalPages: number;
	};
}

export async function fetchPosters(): Promise<PosterResponse> {
	const response = await fetch('http://localhost:8001/api/poster', {
		next: {
			revalidate: 3600, // Cache for 1 hour
			tags: ['posters'] // Add tag for manual revalidation if needed
		},
		cache: 'force-cache', // Force caching
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
		const res = await fetch(`http://localhost:8001/api/poster/${id}`, {
			next: {
				revalidate: 3600, // Cache for 1 hour
				tags: [`poster-${id}`] // Add tag for manual revalidation if needed
			},
			cache: 'force-cache', // Force caching
			headers: {
				'Content-Type': 'application/json',
			},
		})

		if (!res.ok) {
			console.error(`Failed to fetch poster data: ${res.status} ${res.statusText}`)
			return null
		}

		const data = await res.json()

		if (!data) {
			console.error('No data received from API')
			return null
		}

		return data
	} catch (error) {
		console.error('Error fetching poster data:', error)
		return null
	}
}

export function useSlider() {
	return useQuery<PosterResponse>({
		queryKey: ['posters'],
		queryFn: () => fetchPosters(),
	});
}

export function usePosterById(id: string) {
	return useQuery<Poster>({
		queryKey: ['poster', id],
		queryFn: async () => {
			const response = await axios.get(`http://localhost:8001/api/poster/${id}`);
			return response.data;
		},
	});
}
