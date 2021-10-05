import React from 'react';
import { Laureate } from '../../types/laureate';

import Item from './item';

interface Props {
  laureates: Laureate[];
}

export default ({ laureates }: Props) => (
  <>
    {laureates.map((laureate) => (
      <div key={laureate.fullName} className='row mt-4'>
        <div className='col-12'>
          <Item {...laureate} />
        </div>
      </div>
    ))}
  </>
);
