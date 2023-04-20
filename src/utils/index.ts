import { DATA_USA_API } from '../config/endpoints';
import { CardData, FiltersForm, Measurement, Measurements, MeasuresFilter } from '../types';

export const buildUrl = ({ year, measures, period }: FiltersForm): string => {
  const url = new URL(DATA_USA_API);

  url.searchParams.set('drilldowns', 'State');
  url.searchParams.set('measures', measures);
  url.searchParams.set('year', [year - period, year].toString());

  return url.href;
};

export const identity = <T>(value: T): T => value;

export const propData = <T>(obj: { data: T }): T => obj.data;

const cardsSorter = (cd1: CardData, cd2: CardData) => cd2.growth - cd1.growth;

export const postProcessMeasures = (
  measures: Measurements,
  measureFilter: MeasuresFilter
): CardData[] => {
  const halfLength: number = measures.length / 2;
  const cardsData: CardData[] = [];

  for (let index: number = 0; index < halfLength; index++) {
    const [{ [measureFilter]: lastMeasure }, { [measureFilter]: firstMeasure }]: [
      Measurement,
      Measurement
    ] = [measures[index], measures[halfLength + index]];

    const cardData: CardData = {
      state: measures[index].State,
      // @ts-ignore
      growth: ((lastMeasure - firstMeasure) / firstMeasure) * 100,
      // @ts-ignore
      measure: lastMeasure,
    };
    cardsData.push(cardData);
  }

  cardsData.sort(cardsSorter);

  return cardsData;
};
