import React from 'react';

import AwardList from '../award-list';

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
