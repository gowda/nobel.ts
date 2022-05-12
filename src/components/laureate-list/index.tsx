import React from 'react';
import { useParams } from 'react-router-dom';
import { Laureate } from '../../types/laureate';

import Item from './item';

interface Props {
  laureates: Laureate[];
}

const categoryName = (category: string) =>
  category === 'economics' ? 'economic sciences' : category;

export default ({ laureates }: Props) => {
  const { category } = useParams();

  return (
    <>
      {laureates
        .filter(({ nobelPrizes }) =>
          nobelPrizes.some(({ category: prizeCategory }) =>
            category
              ? prizeCategory.toLowerCase().includes(categoryName(category))
              : true
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
