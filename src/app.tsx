import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';

import Container from './container';

const queryClient = new QueryClient();

export default () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <Routes>
        <Route path='/:category/*' element={<Container />} />
        <Route path='/' element={<Container />} />
      </Routes>
    </Router>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
