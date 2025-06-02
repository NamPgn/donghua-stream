import { baseApi } from './base.api';
import { API_ENDPOINTS } from '../../constant/api.constant';

export interface AnimeProduct {
    _id: string;
    seri: string;
}

export interface Anime {
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

export interface AnimeResponse {
    data: Anime[]
    currentPage: number;
    totalPages: number;
    totalCount: number;
}

export const animeApi = {
    getLatest: async (): Promise<AnimeResponse> => {
        return baseApi.get<AnimeResponse>(API_ENDPOINTS.ANIME.LATEST);
    },

    getPopular: async (): Promise<AnimeResponse> => {
        return baseApi.get<AnimeResponse>(API_ENDPOINTS.ANIME.POPULAR);
    },

    getCategory: async (page: number): Promise<AnimeResponse> => {
        return baseApi.get<AnimeResponse>(`${API_ENDPOINTS.ANIME.CATEGORY}?page=${page}`);
    },

    getBySlug: async (slug: string): Promise<Anime> => {
        return baseApi.get<Anime>(`${API_ENDPOINTS.ANIME.BY_SLUG}/${slug}`);
    },

    getEpisode: async (slug: string): Promise<any> => {
        return baseApi.get(`${API_ENDPOINTS.ANIME.EPISODE}/${slug}`);
    },

    search: async (query: string): Promise<Anime> => {
        return baseApi.get<Anime>(`${API_ENDPOINTS.ANIME.SEARCH}?value=${query}`);
    }
}; 