import React from 'react';
import { useParams } from 'react-router-dom';
import { useAwards } from '../../queries';

import LoadingMessage from '../loading-message';
import ErrorMessage from '../error-message';
import Summary from '../award/summary';
import { tagCategory } from '../../utils';

export default () => {
  const { category } = useParams();
  const {
    isLoading,
    isError,
    error,
    data: awards,
  } = useAwards(tagCategory(category!));

  return (
    <>
      {isLoading && <LoadingMessage />}
      {isError && (
        <ErrorMessage message={`Failed to load. ${error!.message}`} />
      )}
      {awards &&
        awards.map((award) => (
          <div
            key={`${award.category}-${award.awardYear}`}
            className='row mt-4'
          >
            <div className='col-3'>
              <span>
                {award.category}, {award.awardYear}
              </span>
            </div>
            <div className='col'>
              {award.topMotivation && (
                <div className='row'>
                  <div className='col text-muted fst-italic'>
                    {award.topMotivation}
                  </div>
                </div>
              )}
              <div className='row'>
                <div className='col'>
                  <Summary {...award} />
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};
