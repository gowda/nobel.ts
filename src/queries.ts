/* eslint-disable import/prefer-default-export */
import { useQuery } from 'react-query';
import { getLaureates } from './storage';

export const useLaureates = () => useQuery('laureates', () => getLaureates());
