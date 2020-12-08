import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from '@reduxjs/toolkit';

import List from './List';

const mockUseDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...Object.assign({}, jest.requireActual('react-redux')),
  useDispatch: () => mockUseDispatch
}));

let reducer: any;
let store: any;

const props = (overrides: any = {}) => ({
  videos: [],
  ...overrides
});

function component(props: any) {
  return render(
    <Provider store={store}>
      <List {...props} />
    </Provider>
  )
};

const testVideos = [
  {
    id: '1',
    thumbnail: 'thumbnail',
    title: 'title'
  },
  {
    id: '2',
    thumbnail: 'thumbnail',
    title: 'title'
  },
  {
    id: '3',
    thumbnail: 'thumbnail',
    title: 'title'
  },
  {
    id: '4',
    thumbnail: 'thumbnail',
    title: 'title'
  },
];

beforeEach(() => {
  reducer = (state: any =  {}, action: any) => {
    return state;
  };

  store = createStore(reducer);
});

test('should render an empty list component', () => {
  const { container } = component({...props()});
  expect(container.querySelector('.list')).toBeInTheDocument();
});

test('should render a list of cards', () => {
  const { container } = component({...props({ videos: testVideos })});
  expect(container.querySelectorAll('.card').length).toBe(testVideos.length);
});

test('should render a list of cards', () => {
  const { container } = component({...props({ videos: testVideos })});
  expect(container.querySelectorAll('.card').length).toBe(testVideos.length);
});

test('should call dispatch when a card is clicked', () => {
  const { container } = component({...props({ videos: testVideos })});
  const card: any = container.querySelector('.card');

  fireEvent.click(card);

  expect(mockUseDispatch).toHaveBeenCalled();
});
