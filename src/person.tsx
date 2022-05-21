import React from 'react';
import { useParams } from 'react-router-dom';

import { useLaureate } from './queries';

import LoadingMessage from './components/loading-message';
import ErrorMessage from './components/error-message';

export default () => {
  const { id } = useParams();
  const { isLoading, isError, error, data: laureate } = useLaureate(id!);

  return (
    <>
      {isLoading && <LoadingMessage />}
      {isError && (
        <ErrorMessage message={`Failed to load. ${error!.message}`} />
      )}
      {laureate && (
        <>
          <div className='row mt-4'>
            <div className='col-12'>
              <h4>{laureate.fullName}</h4>
            </div>
          </div>
          {laureate.birth && (
            <div className='row mt-2'>
              <div className='col-12'>
                <span>
                  Born {laureate.birth.date} at{' '}
                  {laureate.birth.place.locationString}
                </span>
              </div>
            </div>
          )}
          {laureate.death && (
            <div className='row mt-2'>
              <div className='col-12'>
                <span>
                  Died {laureate.death.date} at{' '}
                  {laureate.death.place.locationString}
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
