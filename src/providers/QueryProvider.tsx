'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import * as React from 'react';

const defaultQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 1, // 1 dakika
      gcTime: 1000 * 60 * 3, // 3 dakika
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: true,
      networkMode: 'offlineFirst', // Enable offline support
      enabled: true, // Enable queries by default
      placeholderData: (previousData: unknown) => previousData, // Keep previous data while fetching
      refetchInterval: false // Disable automatic refetching
    },
    mutations: {
      retry: 1,
      networkMode: 'offlineFirst'
    }
  }
});

export const queryClient = defaultQueryClient;

export const QueryProvider = (props: { children: React.ReactNode }) => {
  const [queryClient] = React.useState<QueryClient>(() => defaultQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
