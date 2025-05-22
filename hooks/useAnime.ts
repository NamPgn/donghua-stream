import { useQuery } from '@tanstack/react-query';
import { animeApi, Anime, AnimeResponse } from '@/services/api/anime.api';

export function useAnime() {
	return useQuery<AnimeResponse>({
		queryKey: ['anime'],
		queryFn: () => animeApi.getLatest(),
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

export function useSearchAnime(query: string) {
	return useQuery<Anime >({
		queryKey: ['search', query],
		queryFn: () => animeApi.search(query),
		enabled: query.length > 0,
	});
} 