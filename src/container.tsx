import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

import LaureateList from './components/laureate-list';
import { APIResponse } from './types/api-response';

export default () => {
  const { isLoading, isError, error, data } = useQuery(
    'laureates',
    () =>
      axios
        .get<APIResponse>('http://api.nobelprize.org/2.1/laureates')
        .then((response) => response.data)
        .then((rData) => rData.laureates),
    { staleTime: Infinity, retry: 3 }
  );

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
