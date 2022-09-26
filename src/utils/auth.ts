const TOKEN_KEY = 'token';
const REFRESH_TOKEN = 'refreshToken';

const isLogin = () => {
  return !!localStorage.getItem(TOKEN_KEY);
};

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};
const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN);
};

const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};
const setRefreshToken = (token: string) => {
  localStorage.setItem(REFRESH_TOKEN, token);
};

const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
const clearRefreshToken = () => {
  localStorage.removeItem(REFRESH_TOKEN);
};
export {
  isLogin,
  getToken,
  setToken,
  clearToken,
  getRefreshToken,
  setRefreshToken,
  clearRefreshToken,
};
