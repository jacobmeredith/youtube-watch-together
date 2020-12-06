import React from 'react';
import { render } from '@testing-library/react';

import List from './List';

const props = (overrides: any = {}) => ({
  videos: [],
  ...overrides
});

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
]

test('should render an empty list component', () => {
  const { container } = render(<List {...props()} />);
  expect(container.querySelector('.list')).toBeInTheDocument();
});

test('should render a list of cards', () => {
  const { container } = render(<List {...props({ videos: testVideos })} />);
  expect(container.querySelectorAll('.card').length).toBe(testVideos.length);
});
