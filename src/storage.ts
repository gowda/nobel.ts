/* eslint-disable import/prefer-default-export */
import { Award, fetchAwards, fetchLaureates } from './api';
import { Laureate } from './types/laureate';

const LAUREATES_KEY = 'nobel.ts-laureates';
const AWARDS_KEY = 'nobel.ts-awards';

const getStoredLaureates = (): Laureate[] => {
  const objString = localStorage.getItem(LAUREATES_KEY);
  return (objString && JSON.parse(objString)) || [];
};

const setStoredLaureates = (laureates: Laureate[]) => {
  localStorage.setItem(LAUREATES_KEY, JSON.stringify(laureates));
};

export const getLaureates = (): Promise<Laureate[]> => {
  const storedLaureates = getStoredLaureates();
  if (storedLaureates.length === 0) {
    return fetchLaureates()
      .then((laureates) => setStoredLaureates(laureates))
      .then(() => getLaureates());
  }

  return Promise.resolve(storedLaureates);
};

const getStoredAwards = (): Award[] => {
  const objString = localStorage.getItem(AWARDS_KEY);
  return (objString && JSON.parse(objString)) || [];
};

const setStoredAwards = (awards: Award[]) => {
  localStorage.setItem(AWARDS_KEY, JSON.stringify(awards));
};

export const getAwards = (): Promise<Award[]> => {
  const storedAwards = getStoredAwards();
  if (storedAwards.length === 0) {
    return fetchAwards()
      .then((awards) => setStoredAwards(awards))
      .then(() => getStoredAwards());
  }

  return Promise.resolve(storedAwards);
};
