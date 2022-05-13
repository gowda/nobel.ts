/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import _ from 'lodash';

import { APIResponse, I18nString } from './types/api-response';
import { Laureate } from './types/laureate';
import { transform } from './utils';

const instance = axios.create({
  baseURL: 'https://api.nobelprize.org/2.1',
});

export const fetchLaureates = (): Promise<Laureate[]> =>
  instance
    .get<APIResponse>('/laureates')
    .then((response) => response.data)
    .then(({ laureates, links }: APIResponse) => {
      const { last } = links;
      if (last) {
        const url = new URL(last);
        const limit = parseInt(url.searchParams.get('limit') || '0', 10);
        const offset = parseInt(url.searchParams.get('offset') || '0', 10);

        return Promise.all([
          Promise.resolve(laureates),
          ..._.range(limit, offset + limit, limit).map((newOffset) =>
            instance
              .get<APIResponse>('/laureates', {
                params: { offset: newOffset, limit },
              })
              .then((resp) => resp.data)
              .then(({ laureates: receivedLaureates }) => receivedLaureates)
          ),
        ]);
      }

      return Promise.resolve([laureates]);
    })
    .then((arrayOfLaureates) => _.flatten(arrayOfLaureates).map(transform));

interface AwardsAPILaureate {
  id: string;
  knownName: I18nString;
  fullName: I18nString;
  portion: string;
  sortOrder: string;
  motivation: I18nString;
}

interface AwardsAPIAward {
  awardYear: string;
  category: I18nString;
  categoryFullName: I18nString;
  prizeAmount: number;
  prizeAdjustedAmount: number;
  laureates: AwardsAPILaureate[];
}

interface AwardsAPIResponse {
  nobelPrizes: AwardsAPIAward[];
  meta: {
    offset: number;
    limit: number;
    count: number;
  };
  links: {
    first: string;
    self: string;
    next: string;
    last: string;
  };
}

export interface Award {
  year: string;
  category: string;
  laureates: Partial<Laureate>[];
}

export const fetchAwards = (): Promise<Award[]> =>
  instance
    .get<AwardsAPIResponse>('/nobelPrizes')
    .then((response) => response.data)
    .then(({ nobelPrizes, links }) => {
      const { last } = links;
      if (last) {
        const url = new URL(last);
        const limit = parseInt(url.searchParams.get('limit') || '0', 10);
        const offset = parseInt(url.searchParams.get('offset') || '0', 10);

        return Promise.all([
          Promise.resolve(nobelPrizes),
          ..._.range(limit, offset + limit, limit).map((newOffset) =>
            instance
              .get<AwardsAPIResponse>('/nobelPrizes', {
                params: { offset: newOffset, limit },
              })
              .then((resp) => resp.data)
              .then(
                ({ nobelPrizes: receivedNobelPrizes }) => receivedNobelPrizes
              )
          ),
        ]);
      }

      return Promise.resolve([nobelPrizes]);
    })
    .then((arrayOfAwards) => _.flatten(arrayOfAwards).map(transform));
