import { baseApi } from './base.api';

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
}

export interface PosterResponse {
  data: Poster[];
  pagination: {
    currentPage: number;
    totalPages: number;
  };
}

export const posterApi = {
  getAll: async (): Promise<PosterResponse> => {
    return baseApi.get<PosterResponse>('/poster');
  },

  getById: async (id: string): Promise<Poster> => {
    return baseApi.get<Poster>(`/poster/${id}`);
  }
}; 