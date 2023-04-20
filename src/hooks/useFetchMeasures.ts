import { useMemo } from 'react';
import { useFetch } from './useFetch';
import { buildUrl, propData } from '../utils';
import { FiltersForm, Measurements, ResponseState } from '../types';

export const useFetchMeasures = (form: FiltersForm): ResponseState<Measurements> => {
  const url: string = useMemo<string>(() => buildUrl(form), [form]);

  return useFetch<Measurements>(url, {
    dataParser: propData<Measurements>,
  });
};
