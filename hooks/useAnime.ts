import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface AnimeProduct {
	_id: string;
	seri: string;
}

interface Anime {
	_id: string;
	name: string;
	anotherName: string;
	slug: string;
	linkImg: string;
	des: string;
	sumSeri: string;
	products: AnimeProduct[];
	type: string;
	week: string;
	up: number;
	year: string;
	time: string;
	isActive: number;
	rating: any[];
	ratingCount: number;
	hour: string;
	season: string;
	lang: string;
	quality: string;
	comment: any[];
	upcomingReleases: string;
	isMovie: string;
	searchCount: number;
	createdAt: string;
	updatedAt: string;
	latestProductUploadDate: string;
}

interface AnimeResponse {
	data: Anime[];
	pagination: {
		currentPage: number;
		totalPages: number;
	};
}

async function fetchAnime(): Promise<AnimeResponse> {
	const response = await axios.get('http://localhost:8001/api/category/latest/next');
	return response.data;
}

async function fetchAnimePopular(): Promise<AnimeResponse> {
	const response = await axios.get('http://localhost:8001/api/category/filters');
	return response.data;
}

export const searchCategory = async (query: string) => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/categorys/search?value=${query}`
		);
		return response.data;
	} catch (error) {
		console.error('Search error:', error);
		return null;
	}
};

export async function getAnimeData(slug: string) {
	try {
		const res = await fetch(`http://localhost:8001/api/category/${slug}`, {
			next: {
				revalidate: 3600, // Cache for 1 hour
				tags: [`anime-${slug}`] // Add tag for manual revalidation if needed
			},
			cache: 'force-cache', // Force caching
			headers: {
				'Content-Type': 'application/json',
			},
		})

		if (!res.ok) {
			console.error(`Failed to fetch anime data: ${res.status} ${res.statusText}`)
			return null
		}

		const data = await res.json()

		if (!data) {
			console.error('No data received from API')
			return null
		}

		return data
	} catch (error) {
		console.error('Error fetching anime data:', error)
		return null
	}
}

export async function getAnimeEpisode(slug: string) {
	try {
		const res = await fetch(`http://localhost:8001/api/product/${slug}`, {
			next: {
				revalidate: 3600, // Cache for 1 hour
				tags: [`anime-${slug}`] // Add tag for manual revalidation if needed
			},
			cache: 'force-cache', // Force caching
			headers: {
				'Content-Type': 'application/json',
			},
		})

		if (!res.ok) {
			console.error(`Failed to fetch anime data: ${res.status} ${res.statusText}`)
			return null
		}

		const data = await res.json()

		if (!data) {
			console.error('No data received from API')
			return null
		}

		return data
	} catch (error) {
		console.error('Error fetching anime data:', error)
		return null
	}
}

export function useAnime() {
	return useQuery<AnimeResponse>({
		queryKey: ['anime'],
		queryFn: () => fetchAnime(),
	});
}

export function useAnimePopular() {
	return useQuery<AnimeResponse>({
		queryKey: ['popular'],
		queryFn: () => fetchAnimePopular(),
	});
}

export function useAnimeById(id: string) {
	return useQuery<Anime>({
		queryKey: ['anime', id],
		queryFn: async () => {
			const response = await axios.get(`http://localhost:8001/api/anime/${id}`);
			return response.data;
		},
	});
}

export function useSearchAnime(query: string) {
	return useQuery({
		queryKey: ['search', query],
		queryFn: () => searchCategory(query),
		enabled: query.length > 0,
	});
} 