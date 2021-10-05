import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import Container from './container';

const queryClient = new QueryClient();

export default () => (
  <QueryClientProvider client={queryClient}>
    <Container />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
