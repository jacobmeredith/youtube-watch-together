import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from './Input';

const props = (overrides: any = {}) => ({
  onMessageSubmit: () => {},
  ...overrides
});

test('should render input', () => {
  const { getByPlaceholderText } = render(<Input {...props()} />);
  expect(getByPlaceholderText('Enter a message')).toBeInTheDocument();
});

test('should render button', () => {
  const { getByText } = render(<Input {...props()} />);
  expect(getByText('Send')).toBeInTheDocument();
});

test('should call onMessageSubmit prop when button is clicked', () => {
  const mockFunction = jest.fn();
  const { getByText } = render(<Input {...props({ onMessageSubmit: mockFunction })} />);
  const button = getByText('Send');

  fireEvent.click(button);

  expect(mockFunction).toHaveBeenCalled();
});

test('should call onMessageSubmit prop with message when button is clicked', () => {
  const mockFunction = jest.fn();
  const { getByPlaceholderText, getByText } = render(<Input {...props({ onMessageSubmit: mockFunction })} />);
  const input = getByPlaceholderText('Enter a message');
  const button = getByText('Send');

  fireEvent.input(input, { target: { value: 'This is a message' } });
  fireEvent.click(button);

  expect(mockFunction).toHaveBeenCalledWith('This is a message');
});

test('should call onMessageSubmit prop with message when form is submitted', () => {
  const mockFunction = jest.fn();
  const { getByPlaceholderText, container } = render(<Input {...props({ onMessageSubmit: mockFunction })} />);
  const input = getByPlaceholderText('Enter a message');
  const form: any = container.querySelector('form');

  fireEvent.input(input, { target: { value: 'This is a message' } });
  fireEvent.submit(form);

  expect(mockFunction).toHaveBeenCalledWith('This is a message');
});

test('should reset input value when form is submitted', () => {
  const mockFunction = jest.fn();
  const { container, getByText } = render(<Input {...props({ onMessageSubmit: mockFunction })} />);
  const input: HTMLInputElement|null = container.querySelector('[placeholder="Enter a message"]');
  const button = getByText('Send');

  if (input){
    fireEvent.input(input, { target: { value: 'This is a message' } });
    fireEvent.click(button);
  }

  expect(input?.value).toBe('');
});
