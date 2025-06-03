import seriesApi from "@/services/api/series.api"
import { useQuery } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

interface Anime {
	id: string
	slug: string
	name: string
	anotherName: string
	linkImg: string
	up: number
	episodes?: number
	categories?: string[]
}

interface Category {
	name: string
	slug: string
	categories: Anime[]
}

interface SeriesResponse {
	data: {
		categoryTopRate: Anime[]
		seasons: Category[]
	}
}

export const useSeries = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['series'],
		queryFn: () => seriesApi.getSeriesByCategories(),
		staleTime: 1000 * 60 * 60 * 24,
		gcTime: 1000 * 60 * 60 * 24,
	})

	return {
		data: data?.data,
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
		data: data?.data,
		isLoading,
		error
	}
}

export const useSeriesAllByActive = () => {
	const { data, isLoading, error } = useQuery<AxiosResponse<SeriesResponse>>({
		queryKey: ['series-all'],
		queryFn: () => seriesApi.getSeriesAllByActive(),
		staleTime: 1000 * 60 * 60 * 24,
		gcTime: 1000 * 60 * 60 * 24,
	})

	return {
		data: data,
		isLoading,
		error
	}
}

