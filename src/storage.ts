/* eslint-disable import/prefer-default-export */
import { fetchLaureates } from './api';
import { Laureate } from './types/laureate';

const LAUREATES_KEY = 'nobel.ts-laureates';

const getStored = (): Laureate[] => {
  const objString = localStorage.getItem(LAUREATES_KEY);
  return (objString && JSON.parse(objString)) || [];
};

const setStored = (laureates: Laureate[]) => {
  localStorage.setItem(LAUREATES_KEY, JSON.stringify(laureates));
};

export const getLaureates = (): Promise<Laureate[]> => {
  const storedLaureates = getStored();
  if (storedLaureates.length === 0) {
    return fetchLaureates()
      .then((laureates) => setStored(laureates))
      .then(() => getLaureates());
  }

  return Promise.resolve(storedLaureates);
};
