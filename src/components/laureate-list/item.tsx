import React from 'react';
import { Laureate } from '../../types/laureate';

import AwardList from '../award-list';

type Props = Laureate;

export default ({ fullName, birth, nobelPrizes }: Props) => (
  <div className='row laureate'>
    <div className='col-4'>{fullName.en}</div>
    <div className='col-4'>
      <AwardList awards={nobelPrizes} />
    </div>
    <div className='col-4'>{birth.place.country.en}</div>
  </div>
);
