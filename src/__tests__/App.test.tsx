/* Libraries */
import { render, screen } from '@testing-library/react';

/* Components */
import React from 'react';
import App from '../App';
import { useFetchMeasures } from '../hooks/useFetchMeasures';
import { postProcessMeasures } from '../utils';
import { initialForm } from '../components/filters';

jest.mock('../hooks/useFetchMeasures', () => ({ useFetchMeasures: jest.fn() }));
jest.mock('../utils', () => ({ postProcessMeasures: jest.fn() }));

describe('App component', () => {
  beforeEach(() => {
    postProcessMeasures.mockImplementation(() => [
      {
        state: 'california',
        growth: 4.444,
        measure: 1_000_000,
      },
    ]);
    useFetchMeasures.mockImplementation(() => ({
      data: [],
      loading: false,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch the measures', () => {
    render(<App />);

    expect(useFetchMeasures).toHaveBeenCalledWith(initialForm);
  });

  it('should post process the measures', () => {
    render(<App />);

    expect(postProcessMeasures).toHaveBeenCalledWith([], 'Household Income');
  });

  describe('case loading', () => {
    beforeEach(() => {
      useFetchMeasures.mockImplementation(() => ({
        data: null,
        loading: true,
      }));
    });

    it('should render the loader', () => {
      render(<App />);
      const loader = screen.getByText('loading...');

      expect(loader).toMatchSnapshot();
      expect(loader).toBeVisible();
    });
    it('should not render the grid', () => {
      const { container } = render(<App />);
      const gridCollection = container.getElementsByClassName('grid');

      expect(gridCollection).toHaveLength(0);
    });
  });

  describe('case not loading', () => {
    it('should not render the loader', () => {
      render(<App />);
      const loader = screen.queryByText('loading...');

      expect(loader).toBeNull();
    });

    it('should render the grid', () => {
      const { container } = render(<App />);
      const gridCollection = container.getElementsByClassName('grid');
      const cardCollection = container.getElementsByClassName('card');
      const state = screen.getByText('california');
      const growth = screen.getByText('4.44% growth');
      const measure = screen.getByText('$1,000,000');

      expect(gridCollection).toHaveLength(1);
      expect(cardCollection).toHaveLength(1);

      expect(state).toBeVisible();
      expect(state).toMatchSnapshot();

      expect(growth).toBeVisible();
      expect(growth).toMatchSnapshot();

      expect(measure).toBeVisible();
      expect(measure).toMatchSnapshot();
    });
  });
});
