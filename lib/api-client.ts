import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import { API_URL, STORAGE_KEYS } from './constants';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach auth token
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync(STORAGE_KEYS.authToken);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await SecureStore.deleteItemAsync(STORAGE_KEYS.authToken);
      await SecureStore.deleteItemAsync(STORAGE_KEYS.refreshToken);
      // TODO: redirect to login or trigger auth store reset
    }
    return Promise.reject(error);
  }
);
