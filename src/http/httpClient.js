import axios from 'axios';
import { authService } from '../services/authService.js';
import { accessTokenService } from '../services/accessTokenService.js';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// add `Authorization` header to all requests
httpClient.interceptors.request.use(request => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    request.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return request;
});

httpClient.interceptors.response.use(
  res => res.data,

  // retry request after refreshing access token
  async error => {
    if (error.response.status !== 401) {
      throw error;
    }

    const originalRequest = error.config;
    const { accessToken } = await authService.refresh();

    accessTokenService.save(accessToken);

    return httpClient.request(originalRequest);
  },
);
