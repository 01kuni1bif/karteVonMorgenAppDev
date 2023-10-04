import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export const ReactQueryConfig = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
