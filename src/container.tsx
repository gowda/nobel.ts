import React from 'react';

import LaureateList from './components/laureate-list';
import { useLaureates } from './queries';

export default () => {
  const { isLoading, isError, error, data } = useLaureates();

  return (
    <div className='container'>
      <div className='row mt-4'>
        <h4 className='col-auto'>Nobel laureates</h4>
      </div>
      <div className='row mt-4'>
        <div className='col-12'>
          {isLoading && <div>Loading...</div>}
          {isError && <div>Failed to load. {(error as any).message}</div>}
          {data && <LaureateList laureates={data} />}
        </div>
      </div>
    </div>
  );
};
