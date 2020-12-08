import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from '@reduxjs/toolkit';

import Room from './Room';

let defaultState: any = {};
let reducer: any;
let store: any;

const props = (overrides: any = {}) => ({
  match: {
    params: {
      id: 'test'
    }
  },
  ...overrides
});

function component(props: any) {
  return render(
    <Provider store={store}>
      <Room {...props} />
    </Provider>
  )
};

beforeEach(() => {
  defaultState = { 
    user: { name: '7897' },
    room: { id: '686', results: { videos: [] }},
    messages: { messages: [] }
  };

  reducer = (state: any =  defaultState, action: any) => {
    return state;
  };

  store = createStore(reducer);
});

test('should render chat', () => {
  const { container } = component({...props()});
  expect(container.querySelector('.chat')).toBeInTheDocument();
});

test('should render join room if users has not connected to a room', () => {
  defaultState = { 
    user: { name: '' },
    room: { id: '', results: { videos: [] }},
    messages: { messages: [] }
  };

  reducer = (state: any =  defaultState, action: any) => {
    return state;
  };

  store = createStore(reducer);

  const { container } = component({...props()});
  expect(container.querySelector('.join-room')).toBeInTheDocument();
});
