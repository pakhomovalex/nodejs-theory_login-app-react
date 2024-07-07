import { authClient as client } from '../http/authClient.js';

export const authService = {
  register: (email, password) => {
    return client.post('/registration', { email, password });
  },
  login: (email, password) => {
    return client.post('/login', { email, password });
  },
  logout: () => client.post('/logout'),
  activate: token => client.get(`/activation/${token}`),
  refresh: () => client.get('/refresh'),
};
