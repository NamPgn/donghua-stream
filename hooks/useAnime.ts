import { useQuery } from '@tanstack/react-query';
import { animeApi, Anime, AnimeResponse } from '@/services/api/anime.api';

export function useAnime() {
	return useQuery<AnimeResponse>({
		queryKey: ['anime'],
		queryFn: () => animeApi.getLatest(),
	});
}

export function useAnimeCategory(page: number) {
	return useQuery<AnimeResponse>({
		queryKey: ['category', page],
		queryFn: () => animeApi.getCategory(page),
	});
}

export function useAnimePopular() {
	return useQuery<AnimeResponse>({
		queryKey: ['popular'],
		queryFn: () => animeApi.getPopular(),
	});
}

export function useAnimeById(id: string) {
	return useQuery<Anime>({
		queryKey: ['anime', id],
		queryFn: () => animeApi.getBySlug(id),
	});
}

export function useSearchAnime(query: string, filters: { categories: string[], status: string }) {
	return useQuery({
		queryKey: ['search', query, filters],
		queryFn: () => animeApi.search(query, filters),
		enabled: query.length > 0,
	});
} 