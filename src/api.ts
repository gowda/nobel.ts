/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import _ from 'lodash';

import { APIResponse } from './types/api-response';
import { Laureate } from './types/laureate';
import { transform } from './utils';

const instance = axios.create({
  baseURL: 'https://api.nobelprize.org/2.1',
  timeout: 1000,
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
          ..._.range(limit, offset, limit).map((newOffset) =>
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
