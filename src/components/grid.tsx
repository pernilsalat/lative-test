import React from 'react';
import Container from 'react-bootstrap/Container';

interface Props {
  data: any[];
  children: (value: any) => JSX.Element;
}
export function Grid({ data, children }: Props): JSX.Element {
  return (
    <Container
      fluid
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(5, 1fr)',
        gridColumnGap: '15px',
        gridGap: '15px',
      }}>
      {data.map((d, index) => children({ ...d, key: index }))}
    </Container>
  );
}
