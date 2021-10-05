import React from 'react';

import { Award } from '../../types/award';

import Item from './item';

interface Props {
  awards: Award[];
}

export default ({ awards }: Props) => (
  <>
    {awards.map((award) => (
      <div key={award.awardYear} className='row'>
        <div className='col-12'>
          <Item {...award} />
        </div>
      </div>
    ))}
  </>
);
