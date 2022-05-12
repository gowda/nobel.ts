import React from 'react';
import { useParams } from 'react-router-dom';

import _ from 'lodash';
import { useAwardLaureates } from '../../queries';
import { tagCategory } from '../../utils';

import LoadingMessage from '../loading-message';
import ErrorMessage from '../error-message';

export default () => {
  const { category, year } = useParams();
  const {
    isLoading,
    isError,
    error,
    data: laureates,
  } = useAwardLaureates(tagCategory(category!), year!);

  return (
    <>
      <div className='row'>
        <div className='col-sm-12 col-md-8'>
          <h4>
            {tagCategory(category!)}, {year}
          </h4>
        </div>
      </div>

      {isLoading && <LoadingMessage />}
      {isError && <ErrorMessage message={`Failed to load. ${error.message}`} />}
      {laureates &&
        Object.getOwnPropertyNames(
          _.groupBy(laureates, ({ nobelPrizes }) => nobelPrizes[0].motivation)
        ).map((motivation) => (
          <div className='row mb-2'>
            <div className='col-4'>
              {laureates
                .filter(({ nobelPrizes }) =>
                  nobelPrizes.some(
                    ({ motivation: prizeMotivation }) =>
                      prizeMotivation === motivation
                  )
                )
                .map(({ fullName, founded, birth }) => (
                  <div className='row'>
                    <div className='col-12'>
                      {fullName}
                      {founded &&
                        founded.place &&
                        ` (${founded.place.country})`}
                      {birth && birth.place && ` (${birth.place.country})`}
                    </div>
                  </div>
                ))}
            </div>
            <div className='col text-muted fst-italic'>{motivation}</div>
          </div>
        ))}
    </>
  );
};
