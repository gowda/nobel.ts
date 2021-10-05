import { Award } from './award';

interface Place {
  city: string;
  country: string;
  cityNow: string;
  countryNow: string;
  continent: string;
  locationString: string;
}

type DateString = string;

interface Event {
  date: DateString;
  place: Place;
}

export interface Laureate {
  fullName?: string;
  orgName?: string;
  birth?: Event;
  founded?: Event;
  nobelPrizes: Award[];
}
