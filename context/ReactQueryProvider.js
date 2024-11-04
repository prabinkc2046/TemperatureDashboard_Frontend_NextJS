'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create QueryClient outside of the component to avoid reinitialization
const queryClient = new QueryClient();

const ReactQueryProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
