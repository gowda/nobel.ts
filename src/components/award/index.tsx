import React from 'react';
import { useParams } from 'react-router-dom';

import _ from 'lodash';
import { useAward } from '../../queries';
import { tagCategory } from '../../utils';

import LoadingMessage from '../loading-message';
import ErrorMessage from '../error-message';

export default () => {
  const { category, year } = useParams();
  const {
    isLoading,
    isError,
    error,
    data: award,
  } = useAward(tagCategory(category!), year!);

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
      {award &&
        award.laureates &&
        Object.getOwnPropertyNames(
          _.groupBy(award.laureates, ({ motivation }) => motivation)
        ).map((motivation) => (
          <div className='row mb-2'>
            <div className='col-4'>
              {award.laureates
                .filter(
                  ({ motivation: laureateMotivation }) =>
                    laureateMotivation === motivation
                )
                .map(({ fullName }) => (
                  <div className='row'>
                    <div className='col-12'>{fullName}</div>
                  </div>
                ))}
            </div>
            <div className='col text-muted fst-italic'>{motivation}</div>
          </div>
        ))}
    </>
  );
};
