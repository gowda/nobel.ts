import React from 'react';
import { Link } from 'react-router-dom';

import { Award } from '../../types/award';
import { categoryTag } from '../../utils';

type Props = Award;

export default ({ category, awardYear, motivation }: Props) => (
  <>
    <div className='row'>
      <div className='col-12'>
        <Link to={`/${categoryTag(category)}/${awardYear}`}>
          {category}, {awardYear}
        </Link>
      </div>
    </div>
    <div className='row'>
      <div className='col-12 text-muted font-italic'>{motivation}</div>
    </div>
  </>
);
