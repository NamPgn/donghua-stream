import api from "../config/api.config";

const seriesApi = {
    getSeriesByCategories: async () => {
        const response = await api.get(`/series/header`);
        return response;
    },
    getSeriesBySlug: async (slug: string) => {
        const response = await api.get(`/series/${slug}`);
        console.log(response)
        return response;
    }
}

export default seriesApi;
