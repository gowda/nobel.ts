import React from 'react';
import { useParams } from 'react-router-dom';

import { useAward } from '../../queries';
import { tagCategory } from '../../utils';

import LoadingMessage from '../loading-message';
import ErrorMessage from '../error-message';
import Summary from './summary';

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
      {award && <Summary {...award} />}
    </>
  );
};
