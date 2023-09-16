const AUTH_TOKEN_KEY_NAME = "edm-auth-token";

export const getAuthToken = () => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);

  return token;
};

export const saveAuthToken = (token: string) => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};

export const dropAuthToken = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};
