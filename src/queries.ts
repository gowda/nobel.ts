/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { useInfiniteQuery } from 'react-query';
import { NobelPrizeCategory } from './types/api-request';

import { APIResponse } from './types/api-response';
import { Laureate } from './types/laureate';

const isObject = (o: any) => o && !Array.isArray(o) && typeof o === 'object';
const isI18nString = (o: any) => isObject(o) && !!o.en;

const transform = (o: any): any =>
  Object.getOwnPropertyNames(o).reduce((acc: any, key: string) => {
    if (isI18nString(o[key])) {
      return { ...acc, [key]: o[key].en };
    }

    if (isObject(o[key])) {
      return { ...acc, [key]: transform(o[key]) };
    }

    if (Array.isArray(o[key])) {
      return { ...acc, [key]: o[key].map(transform) };
    }
    return { ...acc, [key]: o[key] };
  }, {});

export const useLaureates = (category?: string) =>
  useInfiniteQuery<APIResponse, Error, Laureate[]>(
    ['laureates', category],
    ({ pageParam }) =>
      axios
        .get<APIResponse>('http://api.nobelprize.org/2.1/laureates', {
          params: {
            ...pageParam,
            ...(category
              ? {
                  nobelPrizeCategory:
                    Object.values(NobelPrizeCategory)[
                      Object.keys(NobelPrizeCategory).indexOf(category)
                    ],
                }
              : {}),
          },
        })
        .then((response) => response.data),
    {
      staleTime: Infinity,
      retry: 3,
      select: (data) => ({
        pages: data.pages.map((page) => page.laureates.map(transform)),
        pageParams: data.pageParams,
      }),
      getNextPageParam: (lastPage) => {
        if (!lastPage.links.next) {
          return undefined;
        }

        const nextURL = new URL(lastPage.links.next);

        return {
          offset: nextURL.searchParams.get('offset'),
          limit: nextURL.searchParams.get('limit'),
        };
      },
    }
  );
