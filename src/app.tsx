import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';

import Container from './container';
import Orgs from './orgs';
import People from './people';

const queryClient = new QueryClient();

export default () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <Routes>
        <Route path='/people/*' element={<People />} />
        <Route path='/orgs/*' element={<Orgs />} />
        <Route path='/:category/*' element={<Container />} />
        <Route path='/' element={<Container />} />
      </Routes>
    </Router>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
