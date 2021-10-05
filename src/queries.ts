/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { useQuery } from 'react-query';

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

export const useLaureates = () =>
  useQuery<Laureate[], Error>(
    'laureates',
    () =>
      axios
        .get<APIResponse>('http://api.nobelprize.org/2.1/laureates')
        .then((response) => response.data)
        .then((rData) => rData.laureates)
        .then((laureates) => laureates.map(transform)),
    { staleTime: Infinity, retry: 3 }
  );
