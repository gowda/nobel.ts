import React from 'react';

import LaureateList from './components/laureate-list';
import Categories from './components/categories';

import { useLaureates } from './queries';

export default () => {
  const { isLoading, isError, error, data } = useLaureates();

  return (
    <div className='container font-weight-light'>
      <div className='row mt-4'>
        <h4 className='col-auto'>Nobel laureates</h4>
      </div>
      <div className='row mt-4'>
        <div className='col-sm-12 col-md-3'>
          <Categories />
        </div>
        <div className='col-sm-12 col-md-8'>
          {isLoading && <div>Loading...</div>}
          {isError && <div>Failed to load. {(error as any).message}</div>}
          {data && <LaureateList laureates={data} />}
        </div>
      </div>
      <div className='row mt-4 mb-4 justify-content-center' />
    </div>
  );
};
