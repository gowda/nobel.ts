import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAwards, useLaureates } from '../../queries';
import { categoryTag } from '../../utils';

import LoadingMessage from '../loading-message';
import ErrorMessage from '../error-message';
import Item from './item';

export default () => {
  const { category } = useParams();
  const { isLoading, isError, error, data: laureates } = useLaureates();
  const { data: awards } = useAwards();

  useEffect(() => {
    if (awards) {
      console.log('awards found', awards.length);
    }
  }, [awards]);

  return (
    <>
      {isLoading && <LoadingMessage />}
      {isError && <ErrorMessage message={`Failed to load. ${error.message}`} />}
      {laureates &&
        laureates
          .filter(({ nobelPrizes }) =>
            nobelPrizes.some(({ category: prizeCategory }) =>
              category ? categoryTag(prizeCategory) === category : true
            )
          )
          .map((laureate) => (
            <div key={laureate.fullName} className='row mt-4'>
              <div className='col-12'>
                <Item {...laureate} />
              </div>
            </div>
          ))}
    </>
  );
};
