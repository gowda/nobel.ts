import React from 'react';
import { useParams } from 'react-router-dom';
import { useLaureates } from '../../queries';
import { categoryTag } from '../../utils';

import Item from './item';

export default () => {
  const { category } = useParams();
  const { isLoading, isError, error, data: laureates } = useLaureates();

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Failed to load. {(error as any).message}</div>}
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
