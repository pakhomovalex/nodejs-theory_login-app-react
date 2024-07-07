const key = 'accessToken';

export const accessTokenService = {
  get: () => localStorage.getItem(key),
  save: token => localStorage.setItem(key, token),
  remove: () => localStorage.removeItem(key),
};
