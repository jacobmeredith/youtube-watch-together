import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CreateRoom from './CreateRoom';

const props = (overrides: any = {}) => ({
  onSubmit: jest.fn(),
  ...overrides
});

test('should render input and button', () => {
  const { getByPlaceholderText, getByText } = render(<CreateRoom {...props()} />);
  expect(getByPlaceholderText('Enter your nick name')).toBeInTheDocument();
  expect(getByText('Create room')).toBeInTheDocument();
});

test('should update input value', () => {
  const { getByPlaceholderText } = render(<CreateRoom {...props()} />);
  const input: any = getByPlaceholderText('Enter your nick name');
  
  fireEvent.input(input, { target: { value: 'Name' } });

  expect(input.value).toBe('Name');
});

test('should call onSubmit prop when button is clicked', () => {
  const mockFunction = jest.fn();
  const { getByText } = render(<CreateRoom {...props({ onSubmit: mockFunction })} />);
  const button = getByText('Create room');

  fireEvent.click(button);

  expect(mockFunction).toHaveBeenCalled();
});
