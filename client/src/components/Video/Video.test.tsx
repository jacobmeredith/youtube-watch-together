import React from 'react';
import { render } from '@testing-library/react';

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

const props = (overrides: any = {}) => ({
  video: '',
  state: '',
  time: 0,
  onVideoChange: jest.fn(),
  onVideoUpdate: jest.fn(),
  ...overrides
});

test('should render the video component', async () => {
  const { findByPlaceholderText, findByTestId } = render(<Video {...props()} />);
  expect(await findByPlaceholderText('Search for a video')).toBeInTheDocument();
  expect(await findByTestId('player')).toBeInTheDocument();
});
