import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from '@reduxjs/toolkit';

import Home from './Home';

const reducer = jest.fn();
const store = createStore(reducer);
const props = (overrides: any = {}) => ({
  ...overrides
});

function component(props: any) {
  return render(
    <Provider store={store}>
      <Home {...props} />
    </Provider>
  )
};

test('should render the default component', () => {
  const { getByPlaceholderText, getByText } = component({...props()});
  expect(getByPlaceholderText('Enter your nick name')).toBeInTheDocument();
  expect(getByText('Create room')).toBeInTheDocument();
});
