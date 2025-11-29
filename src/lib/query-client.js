import { QueryClient } from "@tanstack/react-query";

let queryClient;

export const getQueryClient = () => {
  if (!queryClient) {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 5 * 60 * 1000, // 5 minutes
          gcTime: 30 * 60 * 1000, // 30 minutes
          retry: (failureCount, error) => {
            if (error && typeof error === "object" && "status" in error) {
              const status = error.status;
              if (status >= 400 && status < 500 && status !== 429) {
                return false;
              }
            }
            return failureCount < 2;
          },
          refetchOnWindowFocus: false,
          refetchOnReconnect: true,
          refetchOnMount: false,
          networkMode: "online",
          suspense: false,
          throwOnError: false,
        },
        mutations: {
          retry: 0,
          networkMode: "online",
          throwOnError: false,
        },
      },
    });
  }
  return queryClient;
};
