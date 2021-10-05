import React from 'react';

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

type Props = Award;

export default ({ category, awardYear, motivation }: Props) => (
  <>
    <div className='row'>
      <div className='col-12'>
        {category.en}, {awardYear}
      </div>
    </div>
    <div className='row'>
      <div className='col-12'>{motivation.en}</div>
    </div>
  </>
);
