import { baseApi } from './base.api';

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
    pagination: {
        currentPage: number;
        totalPages: number;
    };
}

export const animeApi = {
    getLatest: async (): Promise<AnimeResponse> => {
        return baseApi.get<AnimeResponse>('/category/latest/next');
    },

    getPopular: async (): Promise<AnimeResponse> => {
        return baseApi.get<AnimeResponse>('/category/filters');
    },

    getBySlug: async (slug: string): Promise<Anime> => {
        return baseApi.get<Anime>(`/category/${slug}`);
    },

    getEpisode: async (slug: string): Promise<any> => {
        return baseApi.get(`/product/${slug}`);
    },

    search: async (query: string): Promise<Anime> => {
        return baseApi.get<Anime>(`/categorys/search?value=${query}`);
    }
}; 