import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Home from './Home';

const props = (overrides: any = {}) => ({
  onSubmit: jest.fn,
  ...overrides
});

test('should render the default component', () => {
  const { getByPlaceholderText, getByText } = render(<Home {...props()} />);
  expect(getByPlaceholderText('Enter your nick name')).toBeInTheDocument();
  expect(getByText('Create room')).toBeInTheDocument();
});

test('should call onSubmit prop when form is submitted', () => {
  const mockedFunction = jest.fn();
  const { container } = render(<Home {...props({ onSubmit: mockedFunction })} />);
  const form: any = container.querySelector('form');
  fireEvent.submit(form);
  expect(mockedFunction).toHaveBeenCalled();
});
