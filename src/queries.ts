/* eslint-disable import/prefer-default-export */
import _ from 'lodash';
import { useQuery } from 'react-query';
import { Award } from './api';
import { getAwards, getLaureates } from './storage';
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

export const useAwards = () =>
  useQuery<Award[], Error>('awards', () => getAwards());

export const useAward = (category: string, year: string) =>
  useQuery<Award, Error>(['awards', category, year], () =>
    getAwards().then(
      (awards) =>
        awards.find(
          ({ category: awardCategory, awardYear }) =>
            awardCategory === category && awardYear === year
        )!
    )
  );
