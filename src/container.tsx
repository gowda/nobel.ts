import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Navbar from './components/navbar';
import LaureateList from './components/laureate-list';
import Award from './components/award';

export default () => (
  <div className='container font-weight-light'>
    <Navbar />
    <div className='row mt-4'>
      <div className='col-12'>
        <Routes>
          <Route path='/:year' element={<Award />} />
          <Route path='/' element={<LaureateList />} />
        </Routes>
      </div>
    </div>
    <div className='row mt-4 mb-4 justify-content-center' />
  </div>
);
