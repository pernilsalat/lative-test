/* Libraries */
import { render, screen } from '@testing-library/react';

/* Components */
import React from 'react';
import App from '../App';

test('renders learn react link', () => {
  // Arrange
  render(<App />);

  // Act
  const linkElement = screen.getByText(/Growth Ranking of U.S. States/i);

  // Assert
  expect(linkElement).toBeInTheDocument();
});
