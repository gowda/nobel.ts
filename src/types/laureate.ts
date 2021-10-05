import { I18nString, Event } from './api-response';
import { Award } from './award';

export interface Laureate {
  fullName: I18nString;
  birth: Event;
  nobelPrizes: Award[];
}
