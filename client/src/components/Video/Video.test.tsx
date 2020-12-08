import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from '@reduxjs/toolkit';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
var mock = new MockAdapter(axios);

mock.onGet().reply(200, {
  nextPageToken: '',
  items: [
    {
      id: {
        videoId: '1'
      },
      snippet: {
        title: 'Lorem ipsum dolor video',
        thumbnails: {
          high: {
            url: 'htpps://placehold.it/400x300'
          }
        }
      }
    }
  ]
});

import Video from './Video';

const defaultState = { 
  room: { 
    video: '1234',
    state: 'onPlay',
    results: {
      next: '',
      videos: []
    },
    time: 1
  } 
}

const reducer = (state: any = defaultState, action: any) => {
  return state;
};
const store = createStore(reducer);
const props = (overrides: any = {}) => ({
  ...overrides
});

function component(props: any) {
  return render(
    <Provider store={store}>
      <Video {...props} />
    </Provider>
  )
};

test('should render the video component', async () => {
  const { findByPlaceholderText, findByTestId } = component({...props()});
  expect(await findByPlaceholderText('Search for a video')).toBeInTheDocument();
  expect(await findByTestId('player')).toBeInTheDocument();
});
