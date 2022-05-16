import React from 'react';
import { useParams } from 'react-router-dom';

import LoadingMessage from './components/loading-message';
import ErrorMessage from './components/error-message';
import { useLaureate } from './queries';

export default () => {
  const { id } = useParams();
  const { isLoading, isError, error, data: laureate } = useLaureate(id!);

  return (
    <>
      {isLoading && <LoadingMessage />}
      {isError && <ErrorMessage message={`Failed to load. ${error.message}`} />}
      {laureate && (
        <>
          <div className='row mt-4'>
            <div className='col-12'>
              <h4>{laureate.orgName}</h4>
            </div>
          </div>
          {laureate.founded && (
            <div className='row mt-2'>
              <div className='col-12'>
                <span>
                  Founded {laureate.founded.date} at{' '}
                  {laureate.founded.place.locationString}
                </span>
              </div>
            </div>
          )}
          <div className='row mt-2'>
            {laureate.wikipedia && (
              <div className='col-auto'>
                <a
                  href={laureate.wikipedia.english}
                  target='_blank'
                  rel='noreferrer'
                >
                  Wikipedia
                </a>
              </div>
            )}
            {laureate.links.find(({ rel }) => rel === 'external') && (
              <div className='col-auto'>
                <a
                  href={
                    laureate.links.find(({ rel }) => rel === 'external')?.href
                  }
                  target='_blank'
                  rel='noreferrer'
                >
                  Facts at nobelprize.org
                </a>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};
