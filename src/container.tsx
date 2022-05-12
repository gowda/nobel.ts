import React from 'react';

import { Route, Routes } from 'react-router-dom';
import LaureateList from './components/laureate-list';
import Categories from './components/categories';
import Award from './award';

export default () => (
  <div className='container font-weight-light'>
    <div className='row mt-4'>
      <h4 className='col-auto'>Nobel laureates</h4>
    </div>
    <div className='row mt-4'>
      <div className='col-sm-12 col-md-3'>
        <Categories />
      </div>
      <div className='col-sm-12 col-md-8'>
        <Routes>
          <Route path='/:year' element={<Award />} />
          <Route path='/' element={<LaureateList />} />
        </Routes>
      </div>
    </div>
    <div className='row mt-4 mb-4 justify-content-center' />
  </div>
);
