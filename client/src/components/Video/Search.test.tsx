import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Search from './Search';

var mock = new MockAdapter(axios);

beforeEach(() => {
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
});

const props = (overrides: any = {}) => ({
  onVideoChange: jest.fn(),
  ...overrides
});

test('should render the search component', async () => {
  render(<Search {...props()} />);
  expect(await screen.findByPlaceholderText('Search for a video')).toBeInTheDocument();
});

test('should call the the youtube api on load', async () => {
  render(<Search {...props()} />);
  expect(await screen.findByText('Lorem ipsum dolor video')).toBeInTheDocument();
});

test('should call the the youtube api when query is updated', async () => {
  const {container, getByPlaceholderText } = render(<Search {...props()} />);

  const form: any = container.querySelector('form');
  const input = getByPlaceholderText('Search for a video');

  fireEvent.input(input, { target: { value: 'a video title' } });
  fireEvent.submit(form);

  expect(await screen.findByText('Lorem ipsum dolor video')).toBeInTheDocument();
});

test('should call the the youtube api when load more button is clicked', async () => {
  const { getByText, findByText } = render(<Search {...props()} />);

  await waitFor(() => {
    const button = getByText('Load more');
    expect(button).toBeInTheDocument();

    mock.onGet().reply(200, {
      nextPageToken: '',
      items: [
        {
          id: {
            videoId: '2'
          },
          snippet: {
            title: 'Lorem ipsum dolor video 2',
            thumbnails: {
              high: {
                url: 'htpps://placehold.it/400x300'
              }
            }
          }
        }
      ]
    });

    fireEvent.click(button);
  });

  expect(await findByText('Lorem ipsum dolor video')).toBeInTheDocument();
  expect(await findByText('Lorem ipsum dolor video 2')).toBeInTheDocument();
});

test('should render component if request is cancelled', async () => {
  let cancelToken = axios.CancelToken;
  let source = cancelToken.source();

  source.cancel('Operation canceled');
  
  mock.onGet(new RegExp('.*'), { cancelToken: source.token }).reply(200);

  render(<Search {...props()} />);
  
  expect(await screen.findByPlaceholderText('Search for a video')).toBeInTheDocument();
});
