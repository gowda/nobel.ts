/* eslint-disable import/prefer-default-export */
import { useQuery } from 'react-query';
import { getLaureates } from './storage';

export const useLaureates = () => useQuery('laureates', () => getLaureates());

export const useAwardLaureates = (category: string, year: string) =>
  useQuery(['laureates', category, year], () =>
    getLaureates().then((laureates) =>
      laureates.filter(({ nobelPrizes }) =>
        nobelPrizes.some(
          ({ category: prizeCategory, awardYear: prizeYear }) =>
            prizeCategory === category && prizeYear === year
        )
      )
    )
  );
