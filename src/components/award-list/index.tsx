import React from 'react';

import Item from './item';

interface I18nString {
  en: string;
  se?: string;
  no?: string;
}

interface Award {
  category: I18nString;
  awardYear: string;
  motivation: I18nString;
}

interface Props {
  awards: Award[];
}

export default ({ awards }: Props) => (
  <>
    {awards.map((award) => (
      <div className='row'>
        <div className='col-12'>
          <Item {...award} />
        </div>
      </div>
    ))}
  </>
);
