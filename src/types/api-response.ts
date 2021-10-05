export interface I18nString {
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

export interface APILaureate {
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

export interface APIResponse {
  laureates: APILaureate[];
  links: {
    first?: string;
    self?: string;
    next?: string;
    last?: string;
  };
}
