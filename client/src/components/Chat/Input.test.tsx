import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from '@reduxjs/toolkit';

import Input from './Input';

const reducer = (state: any = { user: { name: 'A name' } }, action: any) => {
  return state;
};
const store = createStore(reducer);
const props = (overrides: any = {}) => ({
  ...overrides
});

function component(props: any) {
  return render(
    <Provider store={store}>
      <Input {...props} />
    </Provider>
  )
};

test('should render input', () => {
  const { getByPlaceholderText, getByText } = component({...props()});
  expect(getByPlaceholderText('Enter a message')).toBeInTheDocument();
  expect(getByText('Send')).toBeInTheDocument();
});

test('should reset input value when form is submitted', () => {
  const { container, getByText } = component({...props()});
  const input: HTMLInputElement|null = container.querySelector('[placeholder="Enter a message"]');
  const button = getByText('Send');

  if (input) {
    fireEvent.input(input, { target: { value: 'This is a message' } });
    fireEvent.click(button);
  }

  expect(input?.value).toBe('');
});
