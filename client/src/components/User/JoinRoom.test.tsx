import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import JoinRoom from './JoinRoom';

const props = (overrides: any = {}) => ({
  ...overrides
});

test('should render input and button', () => {
  const { getByPlaceholderText, getByText } = render(<JoinRoom {...props()} />);
  expect(getByPlaceholderText('Enter your nick name')).toBeInTheDocument();
  expect(getByText('Join room')).toBeInTheDocument();
});

test('should call onSubmit prop when button is clicked', () => {
  const mockFunction = jest.fn();
  const { getByText } = render(<JoinRoom {...props({ onSubmit: mockFunction })} />);
  const button = getByText('Join room');

  fireEvent.click(button);

  expect(mockFunction).toHaveBeenCalled();
});
