import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from '@reduxjs/toolkit';

import Chat from './Chat';

let defaultState: any = {};
let reducer: any;
let store: any;

const props = (overrides: any = {}) => ({
  ...overrides
});

function component(props: any) {
  return render(
    <Provider store={store}>
      <Chat {...props} />
    </Provider>
  )
};

beforeEach(() => {
  defaultState = { 
    user: { name: '7897' },
    messages: { messages: [] }
  };

  reducer = (state: any =  defaultState, action: any) => {
    return state;
  };

  store = createStore(reducer);
});

const testMessages = [
  {
    id: '1',
    content: 'Lorem ipsul dolor sit amet 1',
    user: 'user 1',
  },
  {
    id: '2',
    content: 'Lorem ipsul dolor sit amet 2',
    user: 'user 2',
  },
  {
    id: '3',
    content: 'Lorem ipsul dolor sit amet 3',
    user: 'user 2'
  },
  {
    id: '4',
    content: 'Lorem ipsul dolor sit amet 4',
    user: 'user 1',
  },
];

test('should render an empty chat', () => {
  const { container } = component({...props()});
  expect(container.querySelectorAll('.message').length).toBe(0);
});

test('should render messages in the chat', () => {
  defaultState = { 
    user: { name: '7897' },
    room: { id: '686', results: { videos: [] }},
    messages: { messages: testMessages }
  };

  reducer = (state: any =  defaultState, action: any) => {
    return state;
  };

  store = createStore(reducer);

  const { getByText } = component({...props()});

  const messageOne = getByText('Lorem ipsul dolor sit amet 1');
  const messageTwo = getByText('Lorem ipsul dolor sit amet 2');
  const messageThree = getByText('Lorem ipsul dolor sit amet 3');
  const messageFour = getByText('Lorem ipsul dolor sit amet 4');

  expect(messageOne).toBeInTheDocument();
  expect(messageTwo).toBeInTheDocument();
  expect(messageThree).toBeInTheDocument();
  expect(messageFour).toBeInTheDocument();
});
