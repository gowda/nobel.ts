/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { useQuery } from 'react-query';

import { APIResponse } from './types/api-response';

export const useLaureates = () =>
  useQuery(
    'laureates',
    () =>
      axios
        .get<APIResponse>('http://api.nobelprize.org/2.1/laureates')
        .then((response) => response.data)
        .then((rData) => rData.laureates),
    { staleTime: Infinity, retry: 3 }
  );
