import { useFetch } from './useFetch';
import { buildUrl, propData } from '../utils';
import { FiltersForm, Measurements, ResponseState } from '../types';

export const useFetchMesures = (
  form: FiltersForm
): ResponseState<Measurements> => {
  const url = buildUrl(form);
  return useFetch<Measurements>(url.href, {
    dataParser: propData<Measurements>,
  });
};
