import { QueryClient } from '@tanstack/react-query';

import { QUERY } from './constants';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY.staleTime,
      gcTime: QUERY.gcTime,
      retry: 2,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});
