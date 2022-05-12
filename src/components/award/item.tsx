import React from 'react';
import { Laureate } from '../../types/laureate';

import AwardList from '../award-list';

type Props = Laureate;

export default ({ fullName, orgName, founded, birth, nobelPrizes }: Props) => (
  <div className='row laureate'>
    {fullName && <div className='col-4'>{fullName}</div>}
    {orgName && <div className='col-4'>{orgName}</div>}
    <div className='col-4'>
      <AwardList awards={nobelPrizes} />
    </div>
    {founded && founded.place && (
      <div className='col-4'>{founded.place.country}</div>
    )}
    {birth && birth.place && <div className='col-4'>{birth.place.country}</div>}
  </div>
);
