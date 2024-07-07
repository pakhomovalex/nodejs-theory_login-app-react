import { httpClient } from '../http/httpClient.js';

export const userService = {
  getAll: () => httpClient.get('/users'),
};
