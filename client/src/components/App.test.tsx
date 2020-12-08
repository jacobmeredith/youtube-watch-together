import React from 'react';
import { render, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from '@reduxjs/toolkit';

import App from './App';

let defaultState: any = { 
  room: {
    id: '',
    video: '',
    results: {
      next: '',
      videos: []
    },
    time: 0,
    state: 'onPlay'
  },
  user: { 
    name: ''
  },
  messages: { 
    messages: []
  }
};;
let reducer: any = (state: any =  defaultState, action: any) => {
  return state;
};
let store: any = createStore(reducer);

const props = (overrides: any = {}) => ({
  ...overrides
});

function component(props: any) {
  return render(
    <Provider store={store}>
      <App {...props} />
    </Provider>
  )
};

const socketMock: any = jest.mock('socket.io-client');

act(() => {
  socketMock.default = () => {
    return {
      io: () => {
        return {
          on: (type: string, callback: any) => {
            console.log(type);
          }
        }
      }
    }
  }
});

test('should render home by default', () => {
  const { getByPlaceholderText, getByText } = component({...props()});
  const nicknameInput = getByPlaceholderText('Enter your nick name');
  const createButton = getByText('Create room');
  expect(nicknameInput).toBeInTheDocument();
  expect(createButton).toBeInTheDocument();
});

test('should redirect to render room', () => {
  defaultState = { 
    room: {
      id: '1234',
      video: '',
      results: {
        next: '',
        videos: []
      },
      time: 0,
      state: 'onPlay'
    },
    user: { 
      name: 'user 1'
    },
    messages: { 
      messages: []
    }
  };;
  reducer = (state: any =  defaultState, action: any) => {
    return state;
  };
  store = createStore(reducer);

  const { container } = component({...props()});
  expect(container.querySelector('.chat')).toBeInTheDocument();
});
