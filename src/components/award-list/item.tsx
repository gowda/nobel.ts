import React from 'react';

import { Award } from '../../types/award';

type Props = Award;

export default ({ category, awardYear, motivation }: Props) => (
  <>
    <div className='row'>
      <div className='col-12'>
        {category}, {awardYear}
      </div>
    </div>
    <div className='row'>
      <div className='col-12'>{motivation}</div>
    </div>
  </>
);
