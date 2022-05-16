import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Navbar from './components/navbar';
import Org from './org';

export default () => (
  <div className='container font-weight-light'>
    <Navbar />
    <div className='row mt-4'>
      <div className='col-12'>
        <Routes>
          <Route path='/:id' element={<Org />} />
        </Routes>
      </div>
    </div>
    <div className='row mt-4 mb-4 justify-content-center' />
  </div>
);
