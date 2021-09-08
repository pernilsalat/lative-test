import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Growth Ranking of U.S. States/i);
  expect(linkElement).toBeInTheDocument();
});
