import { DATA_USA_API } from '../config/endpoints';
import {
  CardData,
  FiltersForm,
  Measurement,
  Measurements,
  MeasuresFilter,
} from '../types';

export const buildUrl = ({ year, measures, period }: FiltersForm): string => {
  const url = new URL(DATA_USA_API);

  url.searchParams.set('drilldowns', 'State');
  url.searchParams.set('measures', measures);
  url.searchParams.set('year', [year - period, year].toString());

  return url.href;
};

export const identity = <T>(value: T): T => value;

export const propData = <T>(obj: { data: T }): T => obj.data;

interface ReduceReturnType {
  info: Record<string, Measurement>;
  cardsData: Array<CardData>;
}

const cardsSorter = (cd1: CardData, cd2: CardData) => cd2.growth - cd1.growth;
const measuresReducer =
  (measureFilter: MeasuresFilter) =>
  (accumulate: ReduceReturnType, measure: Measurement): ReduceReturnType => {
    const stateId: string = measure['ID State'];
    if (stateId in accumulate.info) {
      const [
        { [measureFilter]: lastMeasure },
        { [measureFilter]: firstMeasure },
      ]: [Measurement, Measurement] = [accumulate.info[stateId], measure];

      accumulate.cardsData.push({
        state: measure.State,
        // @ts-ignore
        growth: ((lastMeasure - firstMeasure) / firstMeasure) * 100,
        // @ts-ignore
        measure: lastMeasure,
      });
    } else {
      accumulate.info[stateId] = measure;
    }

    return accumulate;
  };
export const postProcessMeasures = (
  measures: Measurements,
  measureFilter: MeasuresFilter
): CardData[] => {
  const { cardsData }: ReduceReturnType = measures.reduce<ReduceReturnType>(
    measuresReducer(measureFilter),
    { info: {}, cardsData: [] }
  );

  cardsData.sort(cardsSorter);

  return cardsData;
};
