import seriesApi from "@/services/api/series.api"
import { useQuery } from "@tanstack/react-query"

export const useSeries = () => {
	const { data, isLoading, error } = useQuery<any >({
		queryKey: ['series'],
		queryFn: () => seriesApi.getSeriesByCategories(),
		staleTime: 1000 * 60 * 60 * 24,
		gcTime: 1000 * 60 * 60 * 24,
	})

	return {
		data,
		isLoading,
		error
	}
}

export const useSeriesBySlug = (slug: string) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['series-slug', slug],
		queryFn: () => seriesApi.getSeriesBySlug(slug),
		staleTime: 1000 * 60 * 60 * 24,
		gcTime: 1000 * 60 * 60 * 24,
	})

	return {
		data,
		isLoading,
		error
	}
}
