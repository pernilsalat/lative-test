import React, { useCallback, useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FiltersForm, FormField, FormValue } from '../types';

// interface FormElement {
//   title: FormField | null | undefined;
// }
export function Filters(): JSX.Element {
  const [form, setForm]: [
    FiltersForm,
    React.Dispatch<React.SetStateAction<FiltersForm>>
  ] = useState<FiltersForm>({
    year: 2019,
    measures: 'Household Income',
    period: 1,
  });

  useEffect(() => {
    console.log({form}); // eslint-disable-line
  }, [form]);

  const handleFormChange = useCallback(
    (e: React.ChangeEvent<HTMLFormElement>): void => {
      const title: FormField = e.target.title as FormField;
      const targetValue = e.target.value;
      const value: FormValue = parseInt(targetValue, 10) || targetValue;

      console.log(title, value); // eslint-disable-line
      if (form[title] === value) return;

      setForm(
        (prevForm: FiltersForm): FiltersForm => ({
          ...prevForm,
          [title]: value,
        })
      );
    },
    []
  );

  const formRef: React.MutableRefObject<HTMLFormElement | null> = useRef(null);

  return (
    <Form ref={formRef} onChange={handleFormChange}>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Year</Form.Label>
            <Form.Control as='select' title='year'>
              <option>2019</option>
              <option>2018</option>
              <option>2017</option>
              <option>2016</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Measure</Form.Label>
            <Form.Control as='select' title='measures'>
              <option>Household Income</option>
              <option>Population</option>
              <option>Property Value</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Growth Period</Form.Label>
            <Form.Control as='select' title='period'>
              <option>1 Year</option>
              <option>2 Years</option>
              <option>3 Years</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}
