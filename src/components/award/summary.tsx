import React from 'react';

import _ from 'lodash';

import { Award } from '../../api';

type Props = Award;

export default ({ laureates }: Props) => (
  <>
    {Object.getOwnPropertyNames(
      _.groupBy(laureates, ({ motivation }) => motivation)
    ).map((motivation) => (
      <div className='row mb-2'>
        <div className='col-4'>
          {laureates
            .filter(
              ({ motivation: laureateMotivation }) =>
                laureateMotivation === motivation
            )
            .map(({ fullName, orgName }) => (
              <div className='row'>
                <div className='col-12'>{fullName || orgName}</div>
              </div>
            ))}
        </div>
        <div className='col text-muted fst-italic'>{motivation}</div>
      </div>
    ))}
  </>
);
