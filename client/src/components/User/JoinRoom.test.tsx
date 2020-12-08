import React from 'react';
import { render , fireEvent} from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from '@reduxjs/toolkit';

import JoinRoom from './JoinRoom';

const mockUseDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...Object.assign({}, jest.requireActual('react-redux')),
  useDispatch: () => mockUseDispatch
}));

const reducer = jest.fn();
const store = createStore(reducer);
const props = (overrides: any = {}) => ({
  ...overrides
});

function component(props: any) {
  return render(
    <Provider store={store}>
      <JoinRoom {...props} />
    </Provider>
  )
};

test('should render input and button', () => {
  const { getByPlaceholderText, getByText } = component({...props()});
  expect(getByPlaceholderText('Enter your nick name')).toBeInTheDocument();
  expect(getByText('Join room')).toBeInTheDocument();
});

test('should update input value', () => {
  const { getByPlaceholderText } = component({...props()});
  const input: any = getByPlaceholderText('Enter your nick name');
  
  fireEvent.input(input, { target: { value: 'Name' } });

  expect(input.value).toBe('Name');
});

test('should dispatch action', () => {
  const { getByPlaceholderText, container } = component({...props()});
  const input: any = getByPlaceholderText('Enter your nick name');
  const form: any = container.querySelector('form');
  
  fireEvent.input(input, { target: { value: 'Name' } });
  fireEvent.submit(form);

  expect(mockUseDispatch).toHaveBeenCalled();
});
