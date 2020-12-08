import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from '@reduxjs/toolkit';

import Player from './Player';

const reducer = (state: any = { room: { video: '1234', state: 'onPlay', time: 1 } }, action: any) => {
  return state;
};
const store = createStore(reducer);
const props = (overrides: any = {}) => ({
  ...overrides
});

function component(props: any) {
  return render(
    <Provider store={store}>
      <Player {...props} />
    </Provider>
  )
};

test('should render an empty search', () => {
  const { container } = component({...props()});
  expect(container.querySelector('.player')).toBeInTheDocument();
});
