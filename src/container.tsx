import React from 'react';

import LaureateList from './components/laureate-list';
import { useLaureates } from './queries';

export default () => {
  const { isLoading, isError, error, data, isFetchingNextPage, fetchNextPage } =
    useLaureates();

  return (
    <div className='container'>
      <div className='row mt-4'>
        <h4 className='col-auto'>Nobel laureates</h4>
      </div>
      <div className='row mt-4'>
        <div className='col-12'>
          {isLoading && <div>Loading...</div>}
          {isError && <div>Failed to load. {(error as any).message}</div>}
          {data && (
            <LaureateList
              laureates={data.pages.reduce((acc, v) => [...acc, ...v], [])}
            />
          )}
        </div>
      </div>
      <div className='row mt-4 mb-4 justify-content-center'>
        <div className='col-auto'>
          {data && (
            <button
              type='button'
              className='btn btn-light btn-lg shadow-none'
              disabled={isFetchingNextPage}
              onClick={() => fetchNextPage()}
            >
              {isFetchingNextPage ? 'Loading...' : 'Load more'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
