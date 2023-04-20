export type ValueOf<T> = T[keyof T];

export type NotEmpty<T> = {} extends T ? never : T;

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

export interface ResponseState<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

export type MeasuresFilter = 'Household Income' | 'Population' | 'Property Value';

type ExtraMeasurement = Record<MeasuresFilter, number>;
export interface BaseMeasurement {
  'ID State': string;
  State: string;
  'ID Year': number;
  Year: string;
  'Slug State': string;
}

export type Measurement = BaseMeasurement & RequireAtLeastOne<ExtraMeasurement>;

export type Measurements = Measurement[];

export interface FiltersForm {
  year: number;
  measures: MeasuresFilter;
  period: number;
}

export type FormField = keyof FiltersForm;

export type FormValue = ValueOf<FiltersForm>;

export interface CardData {
  state: string;
  growth: number;
  measure: number;
}
