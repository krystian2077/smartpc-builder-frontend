"use client";

import { ReactNode, useState } from "react";
import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type QueryProviderProps = {
  children: ReactNode;
  queryClientConfig?: QueryClientConfig;
};

export function QueryProvider({
  children,
  queryClientConfig,
}: QueryProviderProps) {
  const [client] = useState(
    () =>
      new QueryClient({
        ...queryClientConfig,
        defaultOptions: {
          ...queryClientConfig?.defaultOptions,
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            ...queryClientConfig?.defaultOptions?.queries,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}


