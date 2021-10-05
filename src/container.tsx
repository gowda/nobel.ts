import React, { useState } from 'react';

import LaureateList from './components/laureate-list';
import Categories from './components/categories';

import { useLaureates } from './queries';

export default () => {
  const [category, setCategory] = useState<string>();
  const {
    isLoading,
    isError,
    error,
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useLaureates(category);

  return (
    <div className='container font-weight-light'>
      <div className='row mt-4'>
        <h4 className='col-auto'>Nobel laureates</h4>
      </div>
      <div className='row mt-4'>
        <div className='col-sm-12 col-md-3'>
          <Categories value={category} onChange={(v) => setCategory(v)} />
        </div>
        <div className='col-sm-12 col-md-8'>
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
          {data && hasNextPage && (
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
