export const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:8000';

export const APP = {
  name: 'iAutos',
  scheme: 'iautos',
  version: '1.0.0',
} as const;

export const QUERY = {
  staleTime: 1000 * 60 * 5, // 5 min
  gcTime: 1000 * 60 * 30, // 30 min
} as const;

export const STORAGE_KEYS = {
  authToken: 'auth_token',
  refreshToken: 'refresh_token',
  onboardingDone: 'onboarding_done',
} as const;
