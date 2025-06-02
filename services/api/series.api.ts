import api from "../config/api.config";
import { API_ENDPOINTS } from '../../constant/api.constant';

const seriesApi = {
    getSeriesByCategories: async () => {
        const response = await api.get(API_ENDPOINTS.SERIES.HEADER);
        return response;
    },
    getSeriesBySlug: async (slug: string) => {
        const response = await api.get(`${API_ENDPOINTS.SERIES.BY_SLUG}/${slug}`);
        return response;
    },

    getSeriesAllByActive: async () => {
        const response = await api.get(`${API_ENDPOINTS.SERIES.ALL}`);
        return response

    }
}

export default seriesApi;
