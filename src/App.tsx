/* Libraries */
import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';

/* Components */
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

/* Styles */
import './App.scss';
import { useFetchMeasures } from './hooks/useFetchMeasures';
import { CardData, FiltersForm, Measurements, ResponseState } from './types';
import { Filters, initialForm } from './components/filters';
import { Card } from './components/card';
import { postProcessMeasures } from './utils';
import { Grid } from './components/grid';

function App(): JSX.Element {
  const [form, setForm]: [FiltersForm, Dispatch<SetStateAction<FiltersForm>>] =
    useState<FiltersForm>(initialForm);

  const { data, loading }: ResponseState<Measurements> = useFetchMeasures(form);

  const cardsData: CardData[] = useMemo<CardData[]>(
    () => postProcessMeasures(data || [], form.measures),
    [data]
  );

  return (
    <div className='app'>
      <div className='formPanel'>
        <Container className='p-3'>
          <Nav>
            <Nav.Item className='logo'>
              <img src='/images/lative-logo.svg' alt='Lative Software' />
            </Nav.Item>
          </Nav>
          <h1 className='header'>Growth Ranking of U.S. States</h1>
          <Filters onChange={setForm} />
        </Container>
      </div>
      <div className='results p-3 overflow-auto d-flex justify-content-center'>
        {loading && <div className='loader text-white fs-2'>loading...</div>}
        {!loading && (
          <Grid<CardData> data={cardsData}>{(cardData: CardData) => <Card {...cardData} />}</Grid>
        )}
      </div>
    </div>
  );
}

export default App;
