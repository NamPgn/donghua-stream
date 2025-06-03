import api from "../config/api.config";
import { API_ENDPOINTS } from '../../constant/api.constant';

const tagsApi = {
    getAllTags: async () => {
        const response = await api.get(API_ENDPOINTS.TAGS.ALL);
        return response
    },
}

export default tagsApi;
