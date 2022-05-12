/* eslint-disable import/prefer-default-export */
import _ from 'lodash';
import { useQuery } from 'react-query';
import { getLaureates } from './storage';
import { Laureate } from './types/laureate';

export const useLaureates = () =>
  useQuery<Laureate[], Error>('laureates', () =>
    getLaureates().then((laureates) =>
      _.orderBy(
        laureates,
        ({ nobelPrizes }) =>
          _.max(nobelPrizes.map(({ awardYear }) => awardYear)),
        ['desc']
      )
    )
  );

export const useAwardLaureates = (category: string, year: string) =>
  useQuery<Laureate[], Error>(['laureates', category, year], () =>
    getLaureates().then((laureates) =>
      laureates
        .filter(({ nobelPrizes }) =>
          nobelPrizes.some(
            ({ category: prizeCategory, awardYear: prizeYear }) =>
              prizeCategory === category && prizeYear === year
          )
        )
        .map(({ nobelPrizes, ...rest }) => ({
          ...rest,
          nobelPrizes: nobelPrizes.filter(
            ({ category: prizeCategory, awardYear }) =>
              prizeCategory === category && awardYear === year
          ),
        }))
    )
  );
