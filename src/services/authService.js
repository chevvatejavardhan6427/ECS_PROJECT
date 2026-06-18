import { apiRequest } from './api';

export const login = (credentials) => apiRequest('/auth/login', { method: 'POST', body: credentials });

export const register = (payload) => apiRequest('/auth/register', { method: 'POST', body: payload });

export const getProfile = (token) => apiRequest('/auth/me', { token });
