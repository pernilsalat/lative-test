import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { CardData } from '../types';

type Props = CardData;
export function Card({ state, growth, measure }: Props): JSX.Element {
  return (
    <Container
      className='square border border-secondary d-flex text-white text-capitalize justify-content-between'
      style={{
        backgroundColor: '#3492B3',
        height: '100px',
        gap: '15px',
      }}>
      <Col md='auto'>
        <Row className='fs-2 fw-bold m-0'>{state}</Row>
        <Row className='m-0'>{growth.toFixed(2)}% growth</Row>
      </Col>
      <Col
        className='d-flex justify-content-center align-items-center fs-4'
        md='auto'>
        ${measure.toLocaleString()}
      </Col>
    </Container>
  );
}
