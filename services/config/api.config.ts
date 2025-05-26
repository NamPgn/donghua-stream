import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { API_BASE_URL, DEFAULT_HEADERS, TIMEOUT, ERROR_MESSAGES, HTTP_STATUS, AUTH } from '../../constant';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUT.DEFAULT,
  headers: DEFAULT_HEADERS,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(AUTH.TOKEN_KEY);
    if (token && config.headers) {
      config.headers.Authorization = `${AUTH.AUTH_HEADER_PREFIX} ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    if (error.response) {
      switch (error.response.status) {
        case HTTP_STATUS.UNAUTHORIZED:
          localStorage.removeItem(AUTH.TOKEN_KEY);
          window.location.href = AUTH.LOGIN_PATH;
          break;
        case HTTP_STATUS.FORBIDDEN:
          console.error(ERROR_MESSAGES.ACCESS_FORBIDDEN);
          break;
        case HTTP_STATUS.NOT_FOUND:
          console.error(ERROR_MESSAGES.RESOURCE_NOT_FOUND);
          break;
        case HTTP_STATUS.SERVER_ERROR:
          console.error(ERROR_MESSAGES.SERVER_ERROR);
          break;
        default:
          console.error(ERROR_MESSAGES.GENERAL_ERROR);
      }
    } else if (error.request) {
      console.error(ERROR_MESSAGES.NETWORK_ERROR);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api; 