import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from '@reduxjs/toolkit';

import Search from './Search';

const defaultState = { 
  room: { 
    results: { 
      videos: [] 
    } 
  } 
}

const reducer = (state: any = defaultState, action: any) => {
  if (action.type === 'ROOM_RESULTS_CHANGE') {
    return {
      ...defaultState,
      room: {
        results: {
          videos: [
            {
              id: {
                videoId: '123'
              },
              snippet: {
                title: 'Lorem ipsum dolor video',
                thumbnails: {
                  high: {
                    url: 'https://placehold.it/400x200'
                  }
                }
              }
            }
          ]
        }
      }
    }
  }
  return state;
};
const store = createStore(reducer);
const props = (overrides: any = {}) => ({
  ...overrides
});

function component(props: any) {
  return render(
    <Provider store={store}>
      <Search {...props} />
    </Provider>
  )
};

test('should render the search component', async () => {
  const { findByPlaceholderText, findByText } = component({...props()});
  expect(await findByPlaceholderText('Search for a video')).toBeInTheDocument();
  // expect(await findByText('Load more')).toStrictEqual(null);
});

test('should call the the youtube api when query is updated', async () => {
  const { container, getByPlaceholderText, findByText } = component({...props()});

  const form: any = container.querySelector('form');
  const input = getByPlaceholderText('Search for a video');

  fireEvent.input(input, { target: { value: 'a video title' } });
  fireEvent.submit(form);

  expect(await findByText('Lorem ipsum dolor video')).toBeInTheDocument();
  expect(await findByText('Load more')).toBeInTheDocument();
});
