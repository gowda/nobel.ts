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

interface Place {
  city: I18nString;
  country: I18nString;
  cityNow: I18nString;
  countryNow: I18nString;
  continent: I18nString;
  locationString: I18nString;
}

interface Event {
  date: string;
  place: Place;
}

interface Laureate {
  fullName: I18nString;
  birth: Event;
  nobelPrizes: Award[];
}

interface Props {
  laureates: Laureate[];
}

export default ({ laureates }: Props) => (
  <>
    {laureates.map((laureate) => (
      <div key={laureate.fullName.en} className='row mt-4'>
        <div className='col-12'>
          <Item {...laureate} />
        </div>
      </div>
    ))}
  </>
);
