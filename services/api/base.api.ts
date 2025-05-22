import api from '../config/api.config';

export const baseApi = {
  get: async <T>(url: string, params?: any): Promise<T> => {
    return api.get(url, { params });
  },

  post: async <T>(url: string, data?: any): Promise<T> => {
    return api.post(url, data);
  },

  put: async <T>(url: string, data?: any): Promise<T> => {
    return api.put(url, data);
  },

  delete: async <T>(url: string): Promise<T> => {
    return api.delete(url);
  },

  patch: async <T>(url: string, data?: any): Promise<T> => {
    return api.patch(url, data);
  }
}; 