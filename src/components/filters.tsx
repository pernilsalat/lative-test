import React, {
  ChangeEvent,
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useRef,
} from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FiltersForm, FormField, FormValue } from '../types';

export const initialForm: FiltersForm = {
  year: 2019,
  measures: 'Household Income',
  period: 1,
};

interface FilterProps {
  onChange: Dispatch<SetStateAction<FiltersForm>>;
}
export function Filters({ onChange }: FilterProps): JSX.Element {
  const handleFormChange = useCallback(
    (e: ChangeEvent<HTMLFormElement>): void => {
      const title: FormField = e.target.title as FormField;
      const targetValue = e.target.value;
      const value: FormValue = parseInt(targetValue, 10) || targetValue;

      onChange((prevForm: FiltersForm): FiltersForm => {
        let newForm = prevForm;

        if (prevForm[title] !== value) {
          newForm = { ...prevForm, [title]: value };
        }

        return newForm;
      });
    },
    [onChange]
  );

  const formRef: MutableRefObject<HTMLFormElement | null> = useRef(null);

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
