import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

import LaureateList from './components/laureate-list';

interface I18nString {
  en: string;
  se?: string;
  no?: string;
}

type Gender = 'male' | 'female';

type DateString = string;

interface Place {
  city: I18nString;
  country: I18nString;
  cityNow: I18nString;
  countryNow: I18nString;
  continent: I18nString;
  locationString: I18nString;
}

interface Event {
  date: DateString;
  place: Place;
}

type YearString = string;

type Affiliation = Place & {
  name: I18nString;
  nameNow: I18nString;
};

interface Prize {
  awardYear: YearString;
  category: I18nString;
  categoryFullName: I18nString;
  sortOrder: string;
  portion: string;
  prizeStatus: string;
  motivation: I18nString;
  prizeAmount: number;
  prizeAmountAdjusted: number;
  affiliations: Affiliation[];
}

interface LaureateResponse {
  id: string;
  knownName: I18nString;
  givenName: I18nString;
  familyName: I18nString;
  fullName: I18nString;
  fileName: string;
  gender: Gender;
  birth: Event;
  death: Event;
  nobelPrizes: Prize[];
}

interface QueryResponse {
  laureates: LaureateResponse[];
}

export default () => {
  const { isLoading, isError, error, data } = useQuery(
    'laureates',
    () =>
      axios
        .get<QueryResponse>('http://api.nobelprize.org/2.1/laureates')
        .then((response) => response.data)
        .then((rData) => rData.laureates),
    { staleTime: Infinity, retry: 3 }
  );

  return (
    <div className='container'>
      <div className='row mt-4'>
        <h4 className='col-auto'>Nobel laureates</h4>
      </div>
      <div className='row mt-4'>
        <div className='col-12'>
          {isLoading && <div>Loading...</div>}
          {isError && <div>Failed to load. {(error as any).message}</div>}
          {data && <LaureateList laureates={data} />}
        </div>
      </div>
    </div>
  );
};
