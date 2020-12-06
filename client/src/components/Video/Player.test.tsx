import React from 'react';
import { render } from '@testing-library/react';

import Player from './Player';

const props = (overrides: any = {}) => ({
  id: '1234',
  state: 'onPlay',
  time: 0,
  onReady: jest.fn(),
  onPlay: jest.fn(),
  onPause: jest.fn(),
  onEnd: jest.fn(),
  ...overrides
});

test('should render an empty search', () => {
  const { container } = render(<Player {...props()} />);
  expect(container.querySelector('.player')).toBeInTheDocument();
});
