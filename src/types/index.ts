export interface ResponseState<T> {
  data?: T | null;
  error: Error | null;
  loading: boolean;
}

export interface Measurement {
  'ID State': string;
  State: string;
  'ID Year': number;
  Year: string;
  'Slug State': string;
  'Property Value': number;
}

export type Measurements = Measurement[];

export interface FiltersForm {
  year: number;
  measures: string;
  period: number;
}

export type FormField = 'year' | 'measures' | 'period';

export type FormValue = number | string;
