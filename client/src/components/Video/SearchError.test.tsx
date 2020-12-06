import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import SearchError from './SearchError';

const props = (overrides: any = {}) => ({
  error: '',
  resetErrorBoundary: jest.fn(),
  ...overrides
});

test('should render the search error component text', () => {
  const { getByText } = render(<SearchError {...props()} />);
  expect(getByText('There was an error')).toBeInTheDocument();
});

test('should call the resetErrorBoundary prop on click', () => {
  const mockFunction = jest.fn();
  const { getByText } = render(<SearchError {...props({ resetErrorBoundary: mockFunction })} />);

  fireEvent.click(getByText('Reload'));

  expect(mockFunction).toHaveBeenCalled();
});

