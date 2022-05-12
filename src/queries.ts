/* eslint-disable import/prefer-default-export */
import { useQuery } from 'react-query';
import { getLaureates } from './storage';
import { Laureate } from './types/laureate';

export const useLaureates = () =>
  useQuery<Laureate[], Error>('laureates', () => getLaureates());

export const useAwardLaureates = (category: string, year: string) =>
  useQuery<Laureate[], Error>(['laureates', category, year], () =>
    getLaureates().then((laureates) =>
      laureates.filter(({ nobelPrizes }) =>
        nobelPrizes.some(
          ({ category: prizeCategory, awardYear: prizeYear }) =>
            prizeCategory === category && prizeYear === year
        )
      )
    )
  );
