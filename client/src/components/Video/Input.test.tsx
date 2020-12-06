import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

const props = (overrides: any = {}) => ({
  onSearch: jest.fn,
  ...overrides
});

test('should render an input component', () => {
  const { getByPlaceholderText, getByText } = render(<Input {...props()} />);
  expect(getByPlaceholderText('Search for a video')).toBeInTheDocument();
  expect(getByText('Search')).toBeInTheDocument();
});

test('should call onSearch prop when form is submitted', () => {
  const mockFunction = jest.fn();
  const { container, getByPlaceholderText } = render(<Input {...props({ onSearch: mockFunction })} />);
  const form: any= container.querySelector('form');
  const input = getByPlaceholderText('Search for a video');

  fireEvent.input(input, { target: { value: 'Search term' } });
  fireEvent.submit(form);

  expect(mockFunction).toHaveBeenCalled();
});

test('should call onSearch prop with data when form is submitted', () => {
  const mockFunction = jest.fn();
  const { container, getByPlaceholderText } = render(<Input {...props({ onSearch: mockFunction })} />);
  const form: any= container.querySelector('form');
  const input = getByPlaceholderText('Search for a video');

  fireEvent.input(input, { target: { value: 'Search term' } });
  fireEvent.submit(form);

  expect(mockFunction).toHaveBeenCalledWith('Search term');
});
