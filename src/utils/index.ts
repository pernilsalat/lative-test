import { DATA_USA_API } from '../config/endpoints';
import { FiltersForm } from '../types';

export const buildUrl = ({ year, measures, period }: FiltersForm): string => {
  const url = new URL(DATA_USA_API);

  url.searchParams.set('drilldowns', 'State');
  url.searchParams.set('measures', measures);
  url.searchParams.set('year', [year - period, year].toString());

  return url.href;
};

export const identity = <T>(value: T): T => value;

export const propData = <T>(obj: { data: T }): T => obj.data;
