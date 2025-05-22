import { useQuery } from '@tanstack/react-query';
import { posterApi } from '@/services/api/poster.api';
import type { Poster, PosterResponse } from '@/services/poster.server';

export function useSlider() {
	return useQuery<PosterResponse>({
		queryKey: ['posters'],
		queryFn: () => posterApi.getAll(),
	});
}

export function usePosterById(id: string) {
	return useQuery<Poster>({
		queryKey: ['poster', id],
		queryFn: () => posterApi.getById(id),
	});
}
