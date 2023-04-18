/* Libraries */
import React, { useRef } from 'react';

/* Components */
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

/* Styles */
import './App.scss';
import { useFetchMesures } from './hooks/useFetchMesures';
import { Measurements, ResponseState } from './types';
import { Filters } from './components/filters';

function App(): JSX.Element {
  // const [form, setForm] = useState({});
  const { data }: ResponseState<Measurements> = useFetchMesures({
    measures: 'Property Value',
    year: 2018,
    period: 2,
  });
  const formRef: React.MutableRefObject<HTMLFormElement | null> = useRef(null);

  console.log({data}, formRef); // eslint-disable-line

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
          <Filters />
        </Container>
      </div>
      <div className='results'>
        <Container />
      </div>
    </div>
  );
}

export default App;
