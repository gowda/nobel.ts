import React from 'react';
import { useParams } from 'react-router-dom';
import { useAwardLaureates } from './queries';
import { tagCategory } from './utils';
import Item from './components/laureate-list/item';

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

      {isLoading && <div>Loading...</div>}
      {isError && <div>Failed to load. {(error as any).message}</div>}
      {laureates &&
        laureates.map((laureate) => (
          <div key={laureate.fullName} className='row mt-4'>
            <div className='col-12'>
              <Item {...laureate} />
            </div>
          </div>
        ))}
    </>
  );
};
